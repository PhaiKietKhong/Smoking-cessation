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
  Chip,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  Security as SecurityIcon,
  AdminPanelSettings as AdminIcon,
  School as CoachIcon,
  Person as UserIcon,
} from "@mui/icons-material";

const AssignRoleDialog = ({ open, onClose, onSubmit, user }) => {
  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userCurrentRoles, setUserCurrentRoles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch available roles and user's current roles
  useEffect(() => {
    if (open && user) {
      fetchRolesData();
    }
  }, [open, user]);

  const fetchRolesData = async () => {
    setLoading(true);
    try {
      // Fetch all available roles
      const rolesResponse = await fetch('/api/Role', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (rolesResponse.ok) {
        const roles = await rolesResponse.json();
        setAvailableRoles(roles);
      }

      // Fetch user's current roles
      const userRolesResponse = await fetch(`/api/UserRole/user/${user.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (userRolesResponse.ok) {
        const userRoles = await userRolesResponse.json();
        setUserCurrentRoles(userRoles);
        setSelectedRoles(userRoles.map(role => role.roleId));
      }
    } catch (error) {
      console.error('Error fetching roles data:', error);
      // Mock data for development
      const mockRoles = [
        { roleId: 1, name: "User", description: "Regular user access" },
        { roleId: 2, name: "Coach", description: "Coaching privileges" },
        { roleId: 3, name: "Admin", description: "Full system access" },
      ];
      setAvailableRoles(mockRoles);
      
      // Mock current user role based on user.role
      const currentRole = mockRoles.find(r => r.name === user.role);
      if (currentRole) {
        setUserCurrentRoles([currentRole]);
        setSelectedRoles([currentRole.roleId]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (roleId) => {
    setSelectedRoles(prev => {
      if (prev.includes(roleId)) {
        return prev.filter(id => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit(user.userId, selectedRoles);
      handleClose();
    } catch (error) {
      console.error("Error assigning roles:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedRoles([]);
    setUserCurrentRoles([]);
    setAvailableRoles([]);
    onClose();
  };

  const getRoleIcon = (roleName) => {
    switch (roleName) {
      case "Admin":
        return <AdminIcon sx={{ fontSize: 16 }} />;
      case "Coach":
        return <CoachIcon sx={{ fontSize: 16 }} />;
      case "User":
        return <UserIcon sx={{ fontSize: 16 }} />;
      default:
        return <SecurityIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getRoleColor = (roleName) => {
    switch (roleName) {
      case "Admin":
        return "error";
      case "Coach":
        return "warning";
      case "User":
        return "info";
      default:
        return "default";
    }
  };

  const hasChanges = () => {
    const currentRoleIds = userCurrentRoles.map(role => role.roleId);
    return JSON.stringify(currentRoleIds.sort()) !== JSON.stringify(selectedRoles.sort());
  };

  if (!user) return null;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        elevation: 3,
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <SecurityIcon />
            <Typography variant="h6">Manage User Roles</Typography>
          </Stack>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* User Information */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                User Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Username:</strong> {user.username}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Full Name:</strong> {user.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Current Role:</strong>{" "}
                    <Chip
                      icon={getRoleIcon(user.role)}
                      label={user.role}
                      color={getRoleColor(user.role)}
                      size="small"
                      variant="outlined"
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Current Roles */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Current Roles
              </Typography>
              {userCurrentRoles.length > 0 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {userCurrentRoles.map((role) => (
                    <Chip
                      key={role.roleId}
                      icon={getRoleIcon(role.name)}
                      label={role.name}
                      color={getRoleColor(role.name)}
                      variant="filled"
                    />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No roles assigned
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Available Roles */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Assign Roles
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select the roles you want to assign to this user. Users can have multiple roles.
            </Typography>

            <Grid container spacing={2}>
              {availableRoles.map((role) => (
                <Grid item xs={12} sm={6} md={4} key={role.roleId}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      cursor: 'pointer',
                      border: selectedRoles.includes(role.roleId) ? 2 : 1,
                      borderColor: selectedRoles.includes(role.roleId) 
                        ? `${getRoleColor(role.name)}.main` 
                        : 'divider',
                      backgroundColor: selectedRoles.includes(role.roleId) 
                        ? `${getRoleColor(role.name)}.50` 
                        : 'background.paper',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: selectedRoles.includes(role.roleId) 
                          ? `${getRoleColor(role.name)}.100` 
                          : 'grey.50',
                      }
                    }}
                    onClick={() => handleRoleChange(role.roleId)}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Checkbox
                        checked={selectedRoles.includes(role.roleId)}
                        onChange={() => handleRoleChange(role.roleId)}
                        color={getRoleColor(role.name)}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                          {getRoleIcon(role.name)}
                          <Typography variant="subtitle2" fontWeight="bold">
                            {role.name}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {role.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Selected Roles Preview */}
            {selectedRoles.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Selected Roles ({selectedRoles.length})
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {availableRoles
                    .filter(role => selectedRoles.includes(role.roleId))
                    .map((role) => (
                      <Chip
                        key={role.roleId}
                        icon={getRoleIcon(role.name)}
                        label={role.name}
                        color={getRoleColor(role.name)}
                        variant="filled"
                        onDelete={() => handleRoleChange(role.roleId)}
                      />
                    ))}
                </Stack>
              </Box>
            )}

            {/* Warnings */}
            {selectedRoles.some(roleId => {
              const role = availableRoles.find(r => r.roleId === roleId);
              return role?.name === "Admin";
            }) && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                <strong>Warning:</strong> Assigning Admin role will grant full system access to this user.
              </Alert>
            )}

            {selectedRoles.length === 0 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                User must have at least one role assigned. Select appropriate roles above.
              </Alert>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button 
          onClick={handleClose} 
          color="inherit"
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting || selectedRoles.length === 0 || !hasChanges()}
          startIcon={submitting ? <CircularProgress size={16} /> : <SecurityIcon />}
        >
          {submitting ? "Assigning..." : "Assign Roles"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignRoleDialog;
