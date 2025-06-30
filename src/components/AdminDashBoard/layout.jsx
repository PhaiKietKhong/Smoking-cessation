"use client"

import React from "react"
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
} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import PeopleIcon from "@mui/icons-material/People"
import PersonIcon from "@mui/icons-material/Person"
import BarChartIcon from "@mui/icons-material/BarChart"
import SettingsIcon from "@mui/icons-material/Settings"
import { Link } from "react-router-dom"

const drawerWidth = 240
const theme = createTheme()

export default function RootLayout({ children }) {
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
                            bgcolor: "#064e3b", // dark green
                            color: "#fff",
                            borderRight: 0,
                        },
                    }}
                >
                    <Toolbar />
                    <List sx={{ px: 2 }}>
                        <ListItem>
                            <ListItemText
                                primary="Admin Dashboard"
                                primaryTypographyProps={{
                                    fontWeight: "bold",
                                    fontSize: 24,
                                    sx: {
                                        background:
                                            "linear-gradient(90deg,#22c55e,#10b981)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    },
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Navigation"
                                primaryTypographyProps={{
                                    fontWeight: "medium",
                                    fontSize: 16,
                                    color: "#a7f3d0",
                                }}
                            />
                        </ListItem>
                        {[
                            { icon: <HomeIcon />, text: "Overview", to: "/AdminDashBoard" },
                            { icon: <PeopleIcon />, text: "Accounts", to: "/accounts" },
                            { icon: <PersonIcon />, text: "Coaches", to: "/coaches" },
                            { icon: <BarChartIcon />, text: "Analytics", to: "/analytics" },
                            { icon: <SettingsIcon />, text: "Settings", to: "/settings" },
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
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    )
}
