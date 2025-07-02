"use client";

import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Header from "../LandingPage/Header";

const drawerWidth = 240;
const headerHeight = 64; // mặc định của MUI AppBar

export default function RootLayout({ children }) {
  const { isValid, isChecking } = useAuthCheck({ requiredRole: "Admin" });

  if (isChecking) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (!isValid) return null;

  return (
    <>
      <CssBaseline />

      {/* Header nằm trên cùng, chiếm full width */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 1201, // cao hơn Drawer
        }}
      >
        <Header />
      </Box>

      {/* Main layout phía dưới Header */}
      <Box sx={{ display: "flex", pt: `${headerHeight}px` }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "#064e3b",
              color: "#fff",
              borderRight: 0,
              top: `${headerHeight}px`,
              height: `calc(100vh - ${headerHeight}px)`,
              position: "fixed",
            },
          }}
        >
          <List sx={{ px: 2 }}>
            <ListItem disablePadding>
              <ListItemText
                primary="Bảng điều khiển"
                primaryTypographyProps={{
                  fontWeight: "bold",
                  fontSize: 24,
                  sx: {
                    background: "linear-gradient(90deg,#22c55e,#10b981)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                }}
              />
            </ListItem>

            <ListItem disablePadding sx={{ mt: 2 }}>
              <ListItemText
                primary="Điều hướng"
                primaryTypographyProps={{
                  fontWeight: "medium",
                  fontSize: 16,
                  color: "#a7f3d0",
                }}
              />
            </ListItem>

            {[
              { icon: <HomeIcon />, text: "Tổng quan", to: "/AdminDashBoard" },
              { icon: <PeopleIcon />, text: "Tài khoản", to: "/accounts" },
              { icon: <PersonIcon />, text: "Huấn luyện viên", to: "/coaches" },
              { icon: <BarChartIcon />, text: "Thống kê", to: "/analytics" },
              { icon: <SettingsIcon />, text: "Cài đặt", to: "/settings" },
            ].map((item) => (
              <ListItem
                button
                component={Link}
                to={item.to}
                key={item.text}
                sx={{
                  borderRadius: 2,
                  my: 0.5,
                  "&:hover": {
                    bgcolor: "#22c55e",
                    color: "#fff",
                    "& .MuiListItemIcon-root": { color: "#fff" },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#10b981" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,

            width: `calc(100% - ${drawerWidth}px)`,
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
