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
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import usePremiumAccess from "@/hooks/usePremiumAccess";

const AppointmentList = () => {
  const navigate = useNavigate();

  // ✅ Tách rõ isValid và isChecking
  const { isValid: isAuthenticated, isChecking: authChecking } = useAuthCheck({
    requiredRole: "User",
  });
  const {
    hasPremiumAccess,
    loading: premiumLoading,
    error: premiumError,
  } = usePremiumAccess();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(USER_API_ROUTES.GET_APPOINTMENTS, {
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

    // ✅ Đảm bảo chỉ gọi 1 lần sau khi auth và premium check xong
    if (
      !authChecking &&
      !premiumLoading &&
      isAuthenticated &&
      hasPremiumAccess
    ) {
      fetchAppointments();
    }
  }, [authChecking, premiumLoading, isAuthenticated, hasPremiumAccess]);

  if (!isAuthenticated || authChecking) return null;

  if (premiumLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hasPremiumAccess) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Bạn cần nâng cấp lên gói <strong>Premium</strong> để xem danh sách
          cuộc hẹn.
        </Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/Package")}
        >
          Nâng cấp gói Premium
        </Button>
      </Container>
    );
  }

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
          onClick={() => navigate("/userDashboard")}
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
                  <TableCell>Huấn luyện viên</TableCell>
                  <TableCell>Chủ đề</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Thời gian</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt.appointmentId}>
                    <TableCell>{appt.coachName || "-"}</TableCell>
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

export default AppointmentList;
