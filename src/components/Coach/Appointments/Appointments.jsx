import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COACH_API_ROUTES } from "@/api/apiRouter";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const Appointments = () => {
  const navigate = useNavigate();

  const { isValid: isAuthenticated, isChecking: authChecking } = useAuthCheck({
    requiredRole: "Coach",
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(COACH_API_ROUTES.GET_APPOINTMENTS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(res.data || []);
      } catch (err) {
        console.error("Lỗi khi tải cuộc hẹn:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!authChecking && isAuthenticated) {
      fetchAppointments();
    }
  }, [authChecking, isAuthenticated]);

  if (!isAuthenticated || authChecking) return null;

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          color: "primary.light",
          gap: 2,
          bgcolor: "primary.main",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Danh sách cuộc hẹn</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/coachDashboard")}
          sx={{ color: "white", borderColor: "white" }}
        >
          Quay lại Dashboard
        </Button>
      </Box>

      <Container sx={{ mt: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : appointments.length === 0 ? (
          <Typography>Không có cuộc hẹn nào.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Chủ đề</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Thời gian</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt.appointmentId}>
                    <TableCell>{appt.clientName || "-"}</TableCell>
                    <TableCell>{appt.subject || "-"}</TableCell>
                    <TableCell>{appt.description || "-"}</TableCell>
                    <TableCell>
                      {new Date(appt.appointmentTime).toLocaleString("vi-VN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default Appointments;
