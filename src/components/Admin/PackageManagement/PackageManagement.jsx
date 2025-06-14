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
  Inventory as PackageIcon,
  TrendingUp as PremiumIcon,
  StarBorder as BasicIcon,
  Stars as VipIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";
import DashboardLayout from "../DashboardLayout";
import PackageList from "./PackageList";
import CreatePackageDialog from "./CreatePackageDialog";
import EditPackageDialog from "./EditPackageDialog";
import PackageDetailsDialog from "./PackageDetailsDialog";
import AssignCoachDialog from "./AssignCoachDialog";
import mockApiService from "./mockApiService";

const PackageManagement = () => {
  const location = useLocation();
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [currentView, setCurrentView] = useState("packages");
  
  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [assignCoachDialogOpen, setAssignCoachDialogOpen] = useState(false);
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    basic: 0,
    premium: 0,
    vip: 0,
    active: 0,
    inactive: 0
  });

  // Determine current view based on route
  useEffect(() => {
    if (location.pathname.includes("/admin/package-analytics")) {
      setCurrentView("analytics");
    } else if (location.pathname.includes("/admin/package-reports")) {
      setCurrentView("reports");
    } else {
      setCurrentView("packages");
    }
  }, [location.pathname]);

  // Fetch packages from API
  const fetchPackages = async () => {
    setLoading(true);
    try {
      // Try real API first
      const token = localStorage.getItem('token');
      const response = await fetch('/api/Package', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
        calculateStats(data);
      } else {
        throw new Error('Failed to fetch packages');
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      showNotification('Using mock data for development', 'info');
      
      // Fallback to mock data for development
      try {
        const mockResult = await mockApiService.getPackages();
        if (mockResult.success) {
          setPackages(mockResult.data);
          calculateStats(mockResult.data);
        }
      } catch (mockError) {
        console.error('Error with mock data:', mockError);
        showNotification('Failed to load packages', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate package statistics
  const calculateStats = (packageData) => {
    const stats = {
      total: packageData.length,
      basic: packageData.filter(pkg => pkg.type.toLowerCase() === 'basic').length,
      premium: packageData.filter(pkg => pkg.type.toLowerCase() === 'premium').length,
      vip: packageData.filter(pkg => pkg.type.toLowerCase() === 'vip').length,
      active: packageData.filter(pkg => pkg.isActive).length,
      inactive: packageData.filter(pkg => !pkg.isActive).length
    };
    setStats(stats);
  };

  // Filter packages based on search and type
  useEffect(() => {
    let filtered = packages;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.assignedCoachName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(pkg => pkg.type.toLowerCase() === typeFilter);
    }

    setFilteredPackages(filtered);
  }, [packages, searchTerm, typeFilter]);

  // Load packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  // Show notification
  const showNotification = (message, severity = "success") => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Close notification
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Handle package creation
  const handleCreatePackage = async (packageData) => {
    try {
      // Try real API first
      const token = localStorage.getItem('token');
      const response = await fetch('/api/Package', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(packageData)
      });

      if (response.ok) {
        const newPackage = await response.json();
        setPackages(prev => [...prev, newPackage]);
        showNotification('Package created successfully');
        setCreateDialogOpen(false);
      } else {
        throw new Error('Failed to create package');
      }
    } catch (error) {
      console.error('Error creating package:', error);
      
      // Fallback to mock API
      try {
        const mockResult = await mockApiService.createPackage(packageData);
        if (mockResult.success) {
          setPackages(prev => [...prev, mockResult.data]);
          showNotification('Package created successfully (mock)');
          setCreateDialogOpen(false);
        }
      } catch (mockError) {
        showNotification('Failed to create package', 'error');
      }
    }
  };

  // Handle package update
  const handleUpdatePackage = async (packageId, packageData) => {
    try {
      // Try real API first
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/Package/${packageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(packageData)
      });

      if (response.ok) {
        const updatedPackage = await response.json();
        setPackages(prev => prev.map(pkg => 
          pkg.packageId === packageId ? updatedPackage : pkg
        ));
        showNotification('Package updated successfully');
        setEditDialogOpen(false);
      } else {
        throw new Error('Failed to update package');
      }
    } catch (error) {
      console.error('Error updating package:', error);
      
      // Fallback to mock API
      try {
        const mockResult = await mockApiService.updatePackage(packageId, packageData);
        if (mockResult.success) {
          setPackages(prev => prev.map(pkg => 
            pkg.packageId === packageId ? mockResult.data : pkg
          ));
          showNotification('Package updated successfully (mock)');
          setEditDialogOpen(false);
        }
      } catch (mockError) {
        showNotification('Failed to update package', 'error');
      }
    }
  };

  // Handle package deletion (soft delete)
  const handleDeletePackage = async (packageId) => {
    if (!window.confirm('Are you sure you want to delete this package?')) {
      return;
    }

    try {
      // Try real API first
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/Package/${packageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setPackages(prev => prev.map(pkg => 
          pkg.packageId === packageId ? { ...pkg, isActive: false } : pkg
        ));
        showNotification('Package deleted successfully');
      } else {
        throw new Error('Failed to delete package');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      
      // Fallback to mock API
      try {
        const mockResult = await mockApiService.deletePackage(packageId);
        if (mockResult.success) {
          setPackages(prev => prev.map(pkg => 
            pkg.packageId === packageId ? mockResult.data : pkg
          ));
          showNotification('Package deleted successfully (mock)');
        }
      } catch (mockError) {
        showNotification('Failed to delete package', 'error');
      }
    }
  };

  // Handle coach assignment
  const handleAssignCoach = async (packageId, coachId) => {
    try {
      // Try real API first
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/Package/${packageId}/assign-coach`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ coachId })
      });

      if (response.ok) {
        const updatedPackage = await response.json();
        setPackages(prev => prev.map(pkg => 
          pkg.packageId === packageId ? updatedPackage : pkg
        ));
        showNotification('Coach assigned successfully');
        setAssignCoachDialogOpen(false);
      } else {
        throw new Error('Failed to assign coach');
      }
    } catch (error) {
      console.error('Error assigning coach:', error);
      
      // Fallback to mock API
      try {
        const mockResult = await mockApiService.assignCoach(packageId, coachId);
        if (mockResult.success) {
          setPackages(prev => prev.map(pkg => 
            pkg.packageId === packageId ? mockResult.data : pkg
          ));
          showNotification('Coach assigned successfully (mock)');
          setAssignCoachDialogOpen(false);
        }
      } catch (mockError) {
        showNotification('Failed to assign coach', 'error');
      }
    }
  };
  // Get type icon
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'basic': return <BasicIcon />;
      case 'premium': return <PremiumIcon />;
      case 'vip': return <VipIcon />;
      default: return <PackageIcon />;
    }
  };
  // Get type color
  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'basic': return 'default';
      case 'premium': return 'primary';
      case 'vip': return 'warning';
      default: return 'default';
    }
  };

  const content = (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Package Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
          sx={{ borderRadius: 2 }}
        >
          Create Package
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={2}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <PackageIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{stats.total}</Typography>
            <Typography variant="body2" color="text.secondary">Total Packages</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <BasicIcon color="default" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{stats.basic}</Typography>
            <Typography variant="body2" color="text.secondary">Basic</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <PremiumIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{stats.premium}</Typography>
            <Typography variant="body2" color="text.secondary">Premium</Typography>
          </Paper>
        </Grid>        <Grid item xs={12} sm={6} md={2}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <VipIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{stats.vip}</Typography>
            <Typography variant="body2" color="text.secondary">VIP</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <AnalyticsIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{stats.active}</Typography>
            <Typography variant="body2" color="text.secondary">Active</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <AnalyticsIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">{stats.inactive}</Typography>
            <Typography variant="body2" color="text.secondary">Inactive</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {["all", "basic", "premium", "vip"].map((type) => (
                <Chip
                  key={type}
                  label={type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                  color={typeFilter === type ? "primary" : "default"}
                  onClick={() => setTypeFilter(type)}
                  variant={typeFilter === type ? "filled" : "outlined"}
                  clickable
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Package List */}
      <PackageList
        packages={filteredPackages}
        loading={loading}
        onEdit={(pkg) => {
          setSelectedPackage(pkg);
          setEditDialogOpen(true);
        }}
        onDelete={handleDeletePackage}
        onViewDetails={(pkg) => {
          setSelectedPackage(pkg);
          setDetailsDialogOpen(true);
        }}
        onAssignCoach={(pkg) => {
          setSelectedPackage(pkg);
          setAssignCoachDialogOpen(true);
        }}
      />

      {/* Dialogs */}
      <CreatePackageDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreatePackage}
      />

      <EditPackageDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleUpdatePackage}
        package={selectedPackage}
      />

      <PackageDetailsDialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        package={selectedPackage}
      />

      <AssignCoachDialog
        open={assignCoachDialogOpen}
        onClose={() => setAssignCoachDialogOpen(false)}
        onSubmit={handleAssignCoach}
        package={selectedPackage}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
};

export default PackageManagement;
