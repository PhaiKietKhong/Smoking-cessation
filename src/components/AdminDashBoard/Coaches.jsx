// Converted to React + MUI
"use client"

import React, { useState } from "react"
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Typography,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Rating,
} from "@mui/material"
import { Add, Edit } from "@mui/icons-material"

/**
 * @typedef {Object} Coach
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} specialization
 * @property {string} experience
 * @property {number} rating
 * @property {"Active"|"Inactive"} status
 * @property {string} joinDate
 * @property {string} bio
 */

const initialCoaches = [
    {
        id: "1",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        specialization: "Fitness Training",
        experience: "5 years",
        rating: 4.8,
        status: "Active",
        joinDate: "2024-02-20",
        bio: "Certified fitness trainer with expertise in strength training and nutrition.",
    },
    {
        id: "2",
        name: "David Lee",
        email: "david@example.com",
        specialization: "Yoga & Meditation",
        experience: "8 years",
        rating: 4.9,
        status: "Active",
        joinDate: "2024-02-28",
        bio: "Experienced yoga instructor specializing in mindfulness and stress relief.",
    },
    {
        id: "3",
        name: "Maria Garcia",
        email: "maria@example.com",
        specialization: "Nutrition Coaching",
        experience: "3 years",
        rating: 4.6,
        status: "Inactive",
        joinDate: "2024-03-15",
        bio: "Registered dietitian helping clients achieve their health goals through proper nutrition.",
    },
]

export default function CoachesPage() {
    const [coaches, setCoaches] = useState(initialCoaches)
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedCoach, setSelectedCoach] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        specialization: "",
        experience: "",
        bio: "",
        status: "Active",
    })

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            specialization: "",
            experience: "",
            bio: "",
            status: "Active",
        })
        setSelectedCoach(null)
    }

    const handleOpenAdd = () => {
        setEditMode(false)
        resetForm()
        setOpen(true)
    }

    const handleOpenEdit = (coach) => {
        setEditMode(true)
        setSelectedCoach(coach)
        setFormData({
            name: coach.name,
            email: coach.email,
            specialization: coach.specialization,
            experience: coach.experience,
            bio: coach.bio,
            status: coach.status,
        })
        setOpen(true)
    }

    const handleSubmit = () => {
        if (editMode && selectedCoach) {
            setCoaches(coaches.map(c => (c.id === selectedCoach.id ? { ...c, ...formData } : c)))
        } else {
            const newCoach = {
                id: Date.now().toString(),
                ...formData,
                rating: 0,
                joinDate: new Date().toISOString().split("T")[0],
            }
            setCoaches([...coaches, newCoach])
        }
        setOpen(false)
        resetForm()
    }

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Coach Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpenAdd}
                    sx={{
                        bgcolor: "#22c55e",
                        "&:hover": { bgcolor: "#16a34a" },
                    }}
                >
                    Add Coach
                </Button>
            </Box>
            <Card>
                <CardHeader title="Coaches" subheader="Manage coach profiles and their information" />
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Specialization</TableCell>
                                    <TableCell>Experience</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {coaches.map((coach) => (
                                    <TableRow key={coach.id}>
                                        <TableCell>{coach.name}</TableCell>
                                        <TableCell>{coach.email}</TableCell>
                                        <TableCell>{coach.specialization}</TableCell>
                                        <TableCell>{coach.experience}</TableCell>
                                        <TableCell>
                                            <Rating
                                                value={coach.rating}
                                                readOnly
                                                precision={0.1}
                                                size="small"
                                                sx={{ color: "#22c55e" }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={coach.status}
                                                sx={{
                                                    bgcolor: coach.status === "Active" ? "#22c55e" : "#a7f3d0",
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                }}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton size="small" onClick={() => handleOpenEdit(coach)}>
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editMode ? "Update Coach" : "Add New Coach"}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Specialization"
                                fullWidth
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Experience"
                                fullWidth
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Bio"
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                fullWidth
                                displayEmpty
                                inputProps={{ "aria-label": "Status" }}
                            >
                                <MenuItem value="Active" key="active">Active</MenuItem>
                                <MenuItem value="Inactive" key="inactive">Inactive</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            bgcolor: "#22c55e",
                            "&:hover": { bgcolor: "#16a34a" },
                        }}
                    >
                        {editMode ? "Update" : "Add"} Coach
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}