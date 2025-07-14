"use client";

import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import axios from "axios";
import { ADMIN_API_ROUTES } from "@/api/apiRouter";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
export default function CoachesPage() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    specialization: "",
    experience: "",
    bio: "",
    password: "",
  });

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      specialization: "",
      experience: "",
      bio: "",
      password: "",
    });
    setSelectedCoach(null);
  };

  const fetchCoaches = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(ADMIN_API_ROUTES.GET_COACHES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoaches(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách coach:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    resetForm();
    setOpen(true);
  };

  const handleOpenEdit = (coach) => {
    setEditMode(true);
    setSelectedCoach(coach);
    setFormData({
      name: coach.fullName,
      email: coach.email,
      specialization: coach.qualifications,
      experience: coach.experience,
      bio: coach.bio,
      status: coach.status || "ACTIVE",
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      if (editMode && selectedCoach) {
        await axios.put(
          `${ADMIN_API_ROUTES.UPDATE_COACH}/${selectedCoach.coachId}`,
          {
            specialization: formData.specialization,
            bio: formData.bio,
            status: formData.status,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          ADMIN_API_ROUTES.CREATE_COACH,
          {
            username: formData.username,
            email: formData.email,
            password: formData.password, // mặc định hoặc thêm input
            fullName: formData.fullName,
            phone: "0123456789", // mặc định hoặc thêm input
            specialization: formData.specialization,
            bio: formData.bio,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      await fetchCoaches();
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  if (loading) {
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box
        sx={{
          background: "linear-gradient(90deg, #e0f7fa 0%, #f0fdfa 100%)",
          borderRadius: 2,
          p: 3,
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: "#1d4ed8", fontWeight: "bold" }}>
          Danh sách huấn luyện viên
        </Typography>
        <Typography variant="h6" sx={{ color: "#2563eb", mt: 1 }}>
          Quản lý huấn luyện viên giúp người dùng cai thuốc lá
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Quản lý huấn luyện viên</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenAdd}
          sx={{
            bgcolor: "#22c55e",
            "&:hover": { bgcolor: "#16a34a" },
          }}
        >
          Thêm tài khoản
        </Button>
      </Box>

      <Card>
        <CardHeader
          title="Mô tả"
          subheader="Quản lý hồ sơ huấn luyện viên và thông tin của họ"
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Chuyên môn</TableCell>
                  <TableCell>Giới thiệu</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coaches.map((coach) => (
                  <TableRow key={coach.coachId}>
                    <TableCell>{coach.fullName}</TableCell>
                    <TableCell>{coach.email}</TableCell>
                    <TableCell>{coach.qualifications}</TableCell>
                    <TableCell>{coach.bio}</TableCell>
                    <TableCell>
                      <Chip
                        label={coach.status}
                        sx={{
                          bgcolor:
                            coach.status === "ACTIVE" ? "#22c55e" : "#f87171",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        color="success"
                        variant="outlined"
                        onClick={() => handleOpenEdit(coach)}
                        startIcon={<CreateOutlinedIcon fontSize="small" />}
                      >
                        Chỉnh sửa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog Add/Edit */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editMode ? "Cập nhật Huấn luyện viên" : "Thêm Huấn luyện viên mới"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {!editMode ? (
              <>
                {" "}
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Tên tài khoản"
                    fullWidth
                    disabled={editMode}
                    size="small"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    size="small"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={editMode}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Họ và tên"
                    fullWidth
                    disabled={editMode}
                    size="small"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Mật khẩu"
                    type="password"
                    fullWidth
                    size="small"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </Grid>{" "}
              </>
            ) : (
              <></>
            )}

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Chuyên môn"
                fullWidth
                size="small"
                value={formData.specialization}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Giới thiệu"
                fullWidth
                size="small"
                multiline
                rows={3}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#22c55e",
              "&:hover": { bgcolor: "#16a34a" },
            }}
          >
            {editMode ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
