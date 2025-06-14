import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Chip,
  Divider,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const PackageDetailsDialog = ({ open, onClose, package: packageData }) => {
  if (!packageData) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDuration = (days) => {
    if (days === 1) return '1 day';
    if (days < 30) return `${days} days`;
    if (days < 365) {
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;
      if (remainingDays === 0) {
        return months === 1 ? '1 month' : `${months} months`;
      }
      return `${months} month${months > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    }
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    if (remainingDays === 0) {
      return years === 1 ? '1 year' : `${years} years`;
    }
    const months = Math.floor(remainingDays / 30);
    return `${years} year${years > 1 ? 's' : ''} ${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}`;
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'basic': return 'default';
      case 'premium': return 'primary';
      case 'vip': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'success' : 'error';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Package Details
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Main Info */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, bgcolor: 'primary.50' }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {packageData.name}
                  </Typography>
                  <Box display="flex" gap={1} mb={2}>
                    <Chip
                      label={packageData.type}
                      color={getTypeColor(packageData.type)}
                      variant="filled"
                      icon={<CategoryIcon />}
                    />
                    <Chip
                      label={packageData.isActive ? 'Active' : 'Inactive'}
                      color={getStatusColor(packageData.isActive)}
                      variant="filled"
                      icon={packageData.isActive ? <ActiveIcon /> : <InactiveIcon />}
                    />
                  </Box>
                </Box>
                <Box textAlign="right">
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {formatPrice(packageData.price)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    for {formatDuration(packageData.durationDays)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Key Information */}
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Package Information
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <AttachMoney color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Price</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatPrice(packageData.price)}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Schedule color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Duration</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatDuration(packageData.durationDays)}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <CategoryIcon color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Type</Typography>
                  <Typography variant="body1" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                    {packageData.type}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Assignment & Management */}
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Assignment & Management
              </Typography>
              
              {/* Assigned Coach */}
              <Box display="flex" alignItems="center" mb={2}>
                <PersonIcon color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Assigned Coach</Typography>
                  {packageData.assignedCoachName ? (
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: 12 }}>
                        {packageData.assignedCoachName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body1" fontWeight="bold">
                        {packageData.assignedCoachName}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      No coach assigned
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Creator */}
              <Box display="flex" alignItems="center">
                <EditIcon color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Created By</Typography>
                  {packageData.creatorName ? (
                    <Typography variant="body1" fontWeight="bold">
                      {packageData.creatorName}
                    </Typography>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      Unknown
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {packageData.description || 'No description available.'}
              </Typography>
            </Paper>
          </Grid>

          {/* Timestamps */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Timestamps
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <CalendarIcon color="action" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Created</Typography>
                      <Typography variant="body2">
                        {formatDate(packageData.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <EditIcon color="action" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                      <Typography variant="body2">
                        {formatDate(packageData.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Package ID */}
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
              Package ID: {packageData.packageId}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackageDetailsDialog;
