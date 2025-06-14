import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";

const CreatePackageDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "basic",
    durationDays: "",
  });
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Package name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Package name must be at least 3 characters";
    } else if (formData.name.length > 200) {
      newErrors.name = "Package name must not exceed 200 characters";
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must not exceed 1000 characters";
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = "Price must be a positive number";
      } else if (price > 999999999) {
        newErrors.price = "Price is too large";
      }
    }

    // Duration validation
    if (!formData.durationDays) {
      newErrors.durationDays = "Duration is required";
    } else {
      const duration = parseInt(formData.durationDays);
      if (isNaN(duration) || duration <= 0) {
        newErrors.durationDays = "Duration must be a positive number";
      } else if (duration > 3650) { // Max 10 years
        newErrors.durationDays = "Duration cannot exceed 3650 days (10 years)";
      }
    }

    // Type validation
    if (!["basic", "premium", "vip"].includes(formData.type)) {
      newErrors.type = "Please select a valid package type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const packageData = {
        ...formData,
        price: parseFloat(formData.price),
        durationDays: parseInt(formData.durationDays)
      };

      await onSubmit(packageData);
      handleClose();
    } catch (error) {
      console.error('Error creating package:', error);
      setErrors({ submit: 'Failed to create package. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      type: "basic",
      durationDays: "",
    });
    setErrors({});
    onClose();
  };

  const getDurationSuggestions = () => {
    const suggestions = [
      { value: 7, label: "1 week" },
      { value: 14, label: "2 weeks" },
      { value: 30, label: "1 month" },
      { value: 60, label: "2 months" },
      { value: 90, label: "3 months" },
      { value: 180, label: "6 months" },
      { value: 365, label: "1 year" },
    ];
    return suggestions;
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Create New Package
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {errors.submit && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.submit}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Package Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Package Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              placeholder="Enter package name (e.g., Premium Smoking Cessation Plan)"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Package Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel>Package Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                label="Package Type"
              >
                <MenuItem value="basic">
                  <Box display="flex" alignItems="center">
                    <Typography>Basic Package</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="premium">
                  <Box display="flex" alignItems="center">
                    <Typography>Premium Package</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="vip">
                  <Box display="flex" alignItems="center">
                    <Typography>VIP Package</Typography>
                  </Box>
                </MenuItem>
              </Select>
              {errors.type && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.type}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price (VND)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              error={!!errors.price}
              helperText={errors.price}
              placeholder="0"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Duration */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Duration (Days)"
              name="durationDays"
              type="number"
              value={formData.durationDays}
              onChange={handleInputChange}
              error={!!errors.durationDays}
              helperText={errors.durationDays}
              placeholder="30"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ScheduleIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Duration Suggestions */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Common durations:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {getDurationSuggestions().map((suggestion) => (
                <Button
                  key={suggestion.value}
                  size="small"
                  variant="outlined"
                  onClick={() => setFormData(prev => ({ ...prev, durationDays: suggestion.value.toString() }))}
                  sx={{ minWidth: 'auto', fontSize: '0.75rem' }}
                >
                  {suggestion.label}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description || `${formData.description.length}/1000 characters`}
              placeholder="Describe the package features, benefits, and what's included..."
              multiline
              rows={4}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                    <DescriptionIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting}
          sx={{ minWidth: 120 }}
        >
          {submitting ? 'Creating...' : 'Create Package'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePackageDialog;
