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
  Grid,
  Paper,
  Stack,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Tab,
  Tabs,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Security as SecurityIcon,
  AdminPanelSettings as AdminIcon,
  School as CoachIcon,
  Person as UserIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Timeline as ActivityIcon,
  Assignment as TaskIcon,
  EmojiEvents as AchievementIcon,
} from "@mui/icons-material";

const UserDetailsDialog = ({ open, onClose, user }) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);

  useEffect(() => {
    if (open && user) {
      fetchUserDetails();
    }
  }, [open, user]);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      // Fetch detailed user info
      const userResponse = await fetch(`/api/admin/users/${user.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUserDetails(userData);
      }

      // Fetch user roles
      const rolesResponse = await fetch(`/api/UserRole/user/${user.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (rolesResponse.ok) {
        const roles = await rolesResponse.json();
        setUserRoles(roles);
      }

      // Fetch user activities (if regular user)
      if (user.role === "User") {
        const activitiesResponse = await fetch(`/api/Activity/user/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (activitiesResponse.ok) {
          const activities = await activitiesResponse.json();
          setUserActivities(activities.slice(0, 5)); // Show latest 5
        }

        // Fetch user achievements
        const achievementsResponse = await fetch(`/api/UserAchievement/user/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (achievementsResponse.ok) {
          const achievements = await achievementsResponse.json();
          setUserAchievements(achievements);
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Use provided user data as fallback
      setUserDetails(user);
      
      // Mock roles based on user.role
      const mockRoles = [
        { roleId: 1, name: user.role, description: `${user.role} privileges` }
      ];
      setUserRoles(mockRoles);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClose = () => {
    setActiveTab(0);
    setUserDetails(null);
    setUserRoles([]);
    setUserActivities([]);
    setUserAchievements([]);
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

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) return null;

  const displayUser = userDetails || user;

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
          <Typography variant="h6">User Details</Typography>
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
            {/* User Profile Header */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: getRoleColor(displayUser.role) + '.main',
                    fontSize: '2rem'
                  }}
                >
                  {getInitials(displayUser.fullName || displayUser.username)}
                </Avatar>
                
                <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {displayUser.fullName || displayUser.username}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    @{displayUser.username}
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                    <Chip
                      icon={getRoleIcon(displayUser.role)}
                      label={displayUser.role}
                      color={getRoleColor(displayUser.role)}
                      variant="filled"
                    />
                    <Chip
                      icon={displayUser.isActive ? <ActiveIcon /> : <InactiveIcon />}
                      label={displayUser.isActive ? "Active" : "Inactive"}
                      color={displayUser.isActive ? "success" : "default"}
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              </Stack>
            </Paper>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Profile" />
                <Tab label="Roles & Permissions" />
                {user.role === "User" && <Tab label="Activity" />}
                {user.role === "User" && <Tab label="Achievements" />}
              </Tabs>
            </Box>

            {/* Tab Content */}
            {activeTab === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Basic Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Full Name" 
                          secondary={displayUser.fullName || "Not provided"} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <EmailIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Email" 
                          secondary={displayUser.email} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Member Since" 
                          secondary={formatDate(displayUser.createdAt)} 
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Account Status
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          User ID
                        </Typography>
                        <Typography variant="body1">{displayUser.userId}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                        <Chip
                          icon={displayUser.isActive ? <ActiveIcon /> : <InactiveIcon />}
                          label={displayUser.isActive ? "Active Account" : "Inactive Account"}
                          color={displayUser.isActive ? "success" : "error"}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Last Updated
                        </Typography>
                        <Typography variant="body1">
                          {displayUser.updatedAt ? formatDate(displayUser.updatedAt) : "N/A"}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  User Roles
                </Typography>
                {userRoles.length > 0 ? (
                  <Grid container spacing={2}>
                    {userRoles.map((role) => (
                      <Grid item xs={12} sm={6} md={4} key={role.roleId}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            {getRoleIcon(role.name)}
                            <Typography variant="subtitle2" fontWeight="bold">
                              {role.name}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {role.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info">
                    No roles assigned to this user.
                  </Alert>
                )}
              </Box>
            )}

            {activeTab === 2 && user.role === "User" && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Recent Activity
                </Typography>
                {userActivities.length > 0 ? (
                  <List>
                    {userActivities.map((activity, index) => (
                      <ListItem key={index} divider>
                        <ListItemIcon>
                          <ActivityIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary={activity.type || "Activity"}
                          secondary={`${activity.description || "No description"} • ${formatDate(activity.createdAt)}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Alert severity="info">
                    No recent activities found for this user.
                  </Alert>
                )}
              </Box>
            )}

            {activeTab === 3 && user.role === "User" && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Achievements
                </Typography>
                {userAchievements.length > 0 ? (
                  <Grid container spacing={2}>
                    {userAchievements.map((achievement, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <AchievementIcon color="warning" />
                            <Box>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {achievement.name || "Achievement"}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Earned: {formatDate(achievement.earnedAt)}
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info">
                    No achievements earned yet.
                  </Alert>
                )}
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsDialog;
