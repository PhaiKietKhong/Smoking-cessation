"use client"

import * as React from "react"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import HomeIcon from "@mui/icons-material/Home"
import PeopleIcon from "@mui/icons-material/People"
import PersonIcon from "@mui/icons-material/Person"
import BarChartIcon from "@mui/icons-material/BarChart"
import SettingsIcon from "@mui/icons-material/Settings"
import { Link } from "react-router-dom"

const items = [
    { title: "Overview", url: "/", icon: <HomeIcon /> },
    { title: "Accounts", url: "/accounts", icon: <PeopleIcon /> },
    { title: "Coaches", url: "/coaches", icon: <PersonIcon /> },
    { title: "Analytics", url: "/analytics", icon: <BarChartIcon /> },
    { title: "Settings", url: "/settings", icon: <SettingsIcon /> },
]

export function AppSidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 220,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 220, boxSizing: "border-box" },
            }}
        >
            <List>
                <ListItem>
                    <ListItemText
                        primary="Admin Dashboard"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                </ListItem>
                {items.map((item) => (
                    <ListItem button key={item.title} component={Link} to={item.url}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
