import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Alert,
  Snackbar,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  School as CoachIcon,
  Person as UserIcon,
  Analytics as AnalyticsIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import DashboardLayout from "../DashboardLayout";
import UserList from "./UserList";
import CreateUserDialog from "./CreateUserDialog";
import EditUserDialog from "./EditUserDialog";
import AssignRoleDialog from "./AssignRoleDialog";
import UserDetailsDialog from "./UserDetailsDialog";

const UserManagement = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentView, setCurrentView] = useState("users");
  
  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    coaches: 0,
    regularUsers: 0
  });

  // Determine current view based on route
  useEffect(() => {
    if (location.pathname.includes("/admin/user-roles")) {
      setCurrentView("roles");
    } else if (location.pathname.includes("/admin/user-analytics")) {
      setCurrentView("analytics");
    } else {
      setCurrentView("users");
    }
  }, [location.pathname]);

  // Fetch users data
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        calculateStats(data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Failed to fetch users', 'error');
      // Mock data for development
      const mockUsers = [
        {
          userId: 1,
          username: "admin1",
          email: "admin@example.com",
          fullName: "Admin User",
          role: "Admin",
          createdAt: "2024-01-15T10:30:00Z",
          isActive: true
        },
        {
          userId: 2,
          username: "coach1",
          email: "coach@example.com",
          fullName: "John Coach",
          role: "Coach",
          createdAt: "2024-02-20T14:15:00Z",
          isActive: true
        },
        {
          userId: 3,
          username: "user1",
          email: "user@example.com",
          fullName: "Regular User",
          role: "User",
          createdAt: "2024-03-10T09:45:00Z",
          isActive: true
        }
      ];
      setUsers(mockUsers);
      calculateStats(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (usersData) => {
    const stats = {
      totalUsers: usersData.length,
      admins: usersData.filter(user => user.role === 'Admin').length,
      coaches: usersData.filter(user => user.role === 'Coach').length,
      regularUsers: usersData.filter(user => user.role === 'User').length
    };
    setStats(stats);
  };

  // Filter users based on search and role filter
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  // Load data on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Show notification
  const showNotification = (message, severity = "success") => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Handle user creation
  const handleCreateUser = async (userData) => {
    try {
      const response = await fetch('/api/auth/register/admin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        showNotification('User created successfully');
        fetchUsers();
        setCreateDialogOpen(false);
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      showNotification('Failed to create user', 'error');
    }
  };

  // Handle user update
  const handleUpdateUser = async (userId, userData) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        showNotification('User updated successfully');
        fetchUsers();
        setEditDialogOpen(false);
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('Failed to update user', 'error');
    }
  };

  // Handle role assignment
  const handleAssignRole = async (userId, roleIds) => {
    try {
      const response = await fetch(`/api/UserRole/user/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roleIds })
      });

      if (response.ok) {
        showNotification('Roles assigned successfully');
        fetchUsers();
        setRoleDialogOpen(false);
      } else {
        throw new Error('Failed to assign roles');
      }
    } catch (error) {
      console.error('Error assigning roles:', error);
      showNotification('Failed to assign roles', 'error');
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (response.ok) {
          showNotification('User deleted successfully');
          fetchUsers();
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        showNotification('Failed to delete user', 'error');
      }
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box 
          sx={{ 
            p: 2, 
            borderRadius: 2, 
            backgroundColor: `${color}.100`,
            color: `${color}.600`
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" color={`${color}.600`}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage users, roles, and permissions
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<PeopleIcon />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Administrators"
              value={stats.admins}
              icon={<AdminIcon />}
              color="error"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Coaches"
              value={stats.coaches}
              icon={<CoachIcon />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Regular Users"
              value={stats.regularUsers}
              icon={<UserIcon />}
              color="info"
            />
          </Grid>
        </Grid>        {/* View Navigation Tabs */}
        <Paper elevation={1} sx={{ mb: 3 }}>
          <Tabs
            value={currentView}
            onChange={(e, newValue) => setCurrentView(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab 
              label="All Users" 
              value="users" 
              icon={<PeopleIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Role Management" 
              value="roles" 
              icon={<SecurityIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Analytics" 
              value="analytics" 
              icon={<AnalyticsIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        {/* Content based on current view */}
        {currentView === "users" && (
          <>
            {/* Controls */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Stack 
                direction={{ xs: "column", md: "row" }} 
                spacing={2} 
                alignItems={{ md: "center" }}
                justifyContent="space-between"
              >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ flex: 1 }}>
                  <TextField
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ minWidth: 250 }}
                  />
                  
                  <Stack direction="row" spacing={1}>
                    {["all", "Admin", "Coach", "User"].map((role) => (
                      <Chip
                        key={role}
                        label={role === "all" ? "All Roles" : role}
                        color={roleFilter === role ? "primary" : "default"}
                        onClick={() => setRoleFilter(role)}
                        variant={roleFilter === role ? "filled" : "outlined"}
                      />
                    ))}
                  </Stack>
                </Stack>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setCreateDialogOpen(true)}
                  sx={{ minWidth: 150 }}
                >
                  Add User
                </Button>
              </Stack>
            </Paper>

            {/* User List */}
            <UserList
              users={filteredUsers}
              loading={loading}
              onEdit={(user) => {
                setSelectedUser(user);
                setEditDialogOpen(true);
              }}
              onAssignRole={(user) => {
                setSelectedUser(user);
                setRoleDialogOpen(true);
              }}
              onViewDetails={(user) => {
                setSelectedUser(user);
                setDetailsDialogOpen(true);
              }}
              onDelete={handleDeleteUser}
              onRefresh={fetchUsers}
            />
          </>
        )}

        {currentView === "roles" && (
          <Paper elevation={1} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Role Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Manage user roles and permissions across the platform.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', border: '2px solid', borderColor: 'error.light' }}>
                  <AdminIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>Administrators</Typography>
                  <Typography variant="h4" color="error.main" fontWeight="bold">{stats.admins}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Full platform access and control
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', border: '2px solid', borderColor: 'warning.light' }}>
                  <CoachIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>Coaches</Typography>
                  <Typography variant="h4" color="warning.main" fontWeight="bold">{stats.coaches}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Guide and support users in their journey
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', border: '2px solid', borderColor: 'info.light' }}>
                  <UserIcon sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>Regular Users</Typography>
                  <Typography variant="h4" color="info.main" fontWeight="bold">{stats.regularUsers}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Platform participants seeking support
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="outlined" 
                  startIcon={<AdminIcon />}
                  onClick={() => {
                    setRoleFilter("Admin");
                    setCurrentView("users");
                  }}
                >
                  Manage Admins
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<CoachIcon />}
                  onClick={() => {
                    setRoleFilter("Coach");
                    setCurrentView("users");
                  }}
                >
                  Manage Coaches
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<UserIcon />}
                  onClick={() => {
                    setRoleFilter("User");
                    setCurrentView("users");
                  }}
                >
                  Manage Users
                </Button>
              </Stack>
            </Box>
          </Paper>
        )}

        {currentView === "analytics" && (
          <Paper elevation={1} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              User Analytics
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Detailed insights into user activity and platform engagement.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>User Registration Trends</Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
                    <Typography color="text.secondary">Chart component will be implemented here</Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>Role Distribution</Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
                    <Typography color="text.secondary">Pie chart component will be implemented here</Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>User Activity Metrics</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary.main">{stats.totalUsers}</Typography>
                        <Typography variant="body2" color="text.secondary">Total Users</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">85%</Typography>
                        <Typography variant="body2" color="text.secondary">Active Users</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main">12</Typography>
                        <Typography variant="body2" color="text.secondary">Avg. Session (min)</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="info.main">2.3</Typography>
                        <Typography variant="body2" color="text.secondary">Avg. Daily Sessions</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Dialogs */}
        <CreateUserDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onSubmit={handleCreateUser}
        />

        <EditUserDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleUpdateUser}
          user={selectedUser}
        />

        <AssignRoleDialog
          open={roleDialogOpen}
          onClose={() => setRoleDialogOpen(false)}
          onSubmit={handleAssignRole}
          user={selectedUser}
        />

        <UserDetailsDialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          user={selectedUser}
        />

        {/* Notifications */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert 
            severity={notification.severity}
            onClose={() => setNotification({ ...notification, open: false })}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </DashboardLayout>
  );
};

export default UserManagement;
