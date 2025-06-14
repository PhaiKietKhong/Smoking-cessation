import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  PeopleAlt as PeopleAltIcon,
  PersonAdd as PersonAddIcon,
  Assignment as AssignmentIcon,  BarChart as BarChartIcon,
  NotificationsActive as NotificationsActiveIcon,
  ExpandLess,
  ExpandMore,
  Inventory as PackageIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const handleMenuToggle = (menuText) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuText]: !prev[menuText]
    }));
  };  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/adminDashboard" },
    { text: "User Management", icon: <PersonIcon />, path: "/admin/users" },
    { 
      text: "Moderators", 
      icon: <PeopleAltIcon />, 
      subItems: [
        { text: "Moderators", path: "/moderators" },
        { text: "Add new moderator", path: "/moderators/add" }
      ]
    },
    { text: "Package Management", icon: <PackageIcon />, path: "/admin/packages" },
    { text: "Post Management", icon: <AssignmentIcon />, path: "/posts" },
    { text: "Report Management", icon: <AssignmentIcon />, path: "/reports" },
    { text: "Notifications", icon: <NotificationsActiveIcon />, path: "/notifications" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Smoking Cessation Platform
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
            sx={{ ml: 2 }}
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBarStyled>        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1e293b",
            color: "white",
            "& .MuiListItemIcon-root": {
              color: "white",
            },
            "& .MuiListItemText-root": {
              color: "white",
            },
            "& .MuiDivider-root": {
              borderColor: "rgba(255,255,255,0.12)",
            },
            "& .MuiListItemButton-root": {
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            },
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>        <Divider />
          <List>
          {menuItems.map((item) => {
            const isActive = item.path && location.pathname === item.path;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus[item.text];
            const isSubItemActive = hasSubItems && item.subItems.some(subItem => location.pathname === subItem.path);

            return (
              <React.Fragment key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => hasSubItems ? handleMenuToggle(item.text) : handleMenuItemClick(item.path)}
                    sx={{
                      backgroundColor: (isActive || isSubItemActive) ? "rgba(14, 165, 233, 0.15)" : "transparent",
                      borderRight: (isActive || isSubItemActive) ? "3px solid #0ea5e9" : "none",
                      "&:hover": {
                        backgroundColor: (isActive || isSubItemActive) 
                          ? "rgba(14, 165, 233, 0.25)" 
                          : "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        color: (isActive || isSubItemActive) ? "#0ea5e9" : "white" 
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      sx={{ 
                        color: (isActive || isSubItemActive) ? "#0ea5e9" : "white" 
                      }} 
                    />
                    {hasSubItems && (
                      isExpanded ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />
                    )}
                  </ListItemButton>
                </ListItem>
                
                {hasSubItems && (
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <ListItem key={subItem.text} disablePadding>
                            <ListItemButton
                              onClick={() => handleMenuItemClick(subItem.path)}
                              sx={{
                                pl: 4,
                                backgroundColor: isSubActive ? "rgba(14, 165, 233, 0.15)" : "transparent",
                                borderRight: isSubActive ? "3px solid #0ea5e9" : "none",
                                "&:hover": {
                                  backgroundColor: isSubActive 
                                    ? "rgba(14, 165, 233, 0.25)" 
                                    : "rgba(255,255,255,0.08)",
                                },
                              }}
                            >
                              <ListItemText 
                                primary={subItem.text} 
                                sx={{ 
                                  color: isSubActive ? "#0ea5e9" : "white",
                                  "& .MuiListItemText-primary": {
                                    fontSize: "0.875rem"
                                  }
                                }} 
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
      <Main open={open} style={{ overflow: "hidden" }}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default DashboardLayout;
