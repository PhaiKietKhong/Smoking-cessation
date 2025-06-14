import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Assignment as AssignIcon,
  School as CoachIcon,
} from "@mui/icons-material";
import mockApiService from "./mockApiService";

const AssignCoachDialog = ({ open, onClose, onSubmit, package: packageData }) => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoachId, setSelectedCoachId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  // Fetch coaches from API
  const fetchCoaches = async () => {
    setLoading(true);
    setError("");
    try {
      // Try real API first
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/users?role=Coach', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCoaches(data.filter(user => user.role === 'Coach'));
      } else {
        throw new Error('Failed to fetch coaches');
      }
    } catch (error) {
      console.error('Error fetching coaches:', error);
      
      // Fallback to mock API
      try {
        const mockResult = await mockApiService.getCoaches();
        if (mockResult.success) {
          setCoaches(mockResult.data);
        } else {
          setError('Failed to load coaches. Please try again.');
        }
      } catch (mockError) {
        console.error('Error with mock coaches:', mockError);
        setError('Failed to load coaches. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Load coaches when dialog opens
  useEffect(() => {
    if (open) {
      fetchCoaches();
      // Reset form
      setSelectedCoachId(packageData?.assignedCoachId?.toString() || "");
      setError("");
    }
  }, [open, packageData]);

  const handleSubmit = async () => {
    if (!selectedCoachId || !packageData) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(packageData.packageId, parseInt(selectedCoachId));
      handleClose();
    } catch (error) {
      console.error('Error assigning coach:', error);
      setError('Failed to assign coach. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedCoachId("");
    setError("");
    onClose();
  };

  const handleCoachChange = (event) => {
    setSelectedCoachId(event.target.value);
    setError("");
  };

  if (!packageData) {
    return null;
  }

  const selectedCoach = coaches.find(coach => coach.userId === parseInt(selectedCoachId));

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <AssignIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Assign Coach to Package
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Package Info */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Package: {packageData.name}
          </Typography>
          <Box display="flex" gap={1}>
            <Chip 
              label={packageData.type} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={`${packageData.durationDays} days`} 
              size="small" 
              variant="outlined" 
            />
          </Box>
          
          {/* Current Assignment */}
          {packageData.assignedCoachName && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Currently assigned to:
              </Typography>
              <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
                <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: 12 }}>
                  {packageData.assignedCoachName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body2" fontWeight="bold">
                  {packageData.assignedCoachName}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Coach Selection */}
        <FormControl fullWidth disabled={loading}>
          <InputLabel>Select Coach</InputLabel>
          <Select
            value={selectedCoachId}
            onChange={handleCoachChange}
            label="Select Coach"
            startAdornment={<CoachIcon color="action" />}
          >
            <MenuItem value="">
              <em>No coach assigned</em>
            </MenuItem>
            {coaches.map((coach) => (
              <MenuItem key={coach.userId} value={coach.userId.toString()}>
                <Box display="flex" alignItems="center" width="100%">
                  <Avatar sx={{ width: 32, height: 32, mr: 2, fontSize: 14 }}>
                    {coach.fullName?.charAt(0).toUpperCase() || coach.username?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body1">
                      {coach.fullName || coach.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {coach.email}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Loading coaches...
            </Typography>
          </Box>
        )}

        {!loading && coaches.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            No coaches available. Please create coach accounts first.
          </Alert>
        )}

        {/* Selected Coach Preview */}
        {selectedCoach && (
          <Box sx={{ mt: 3, p: 2, border: 1, borderColor: 'primary.main', borderRadius: 1, bgcolor: 'primary.50' }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Selected Coach:
            </Typography>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                {selectedCoach.fullName?.charAt(0).toUpperCase() || selectedCoach.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {selectedCoach.fullName || selectedCoach.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedCoach.email}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  User ID: {selectedCoach.userId}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting || loading || !selectedCoachId}
          sx={{ minWidth: 120 }}
        >
          {submitting ? (
            <>
              <CircularProgress size={16} sx={{ mr: 1 }} />
              Assigning...
            </>
          ) : (
            'Assign Coach'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignCoachDialog;
