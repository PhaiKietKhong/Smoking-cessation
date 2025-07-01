"use client";

import React, { useEffect } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    background: {
      default: "#f9fafb",
    },
    primary: {
      main: "#22c55e",
    },
  },
  typography: {
    fontFamily: "Be Vietnam Pro, sans-serif",
  },
});

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
  if (isValid === false) return null;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
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
            },
          }}
        >
          <Toolbar />
          <List sx={{ px: 2 }}>
            {/* Tiêu đề */}
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

            {/* Nhóm menu */}
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

            {/* Danh sách menu */}
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

        {/* Nội dung chính */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
