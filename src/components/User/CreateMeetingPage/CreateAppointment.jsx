import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import usePremiumAccess from "@/hooks/usePremiumAccess";

const CreateAppointment = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthCheck({ requiredRole: "User" });
  const { hasPremiumAccess, loading: premiumLoading } = usePremiumAccess();

  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [durationMinutes, setDurationMinutes] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [coachInfo, setCoachInfo] = useState(null);
  const [hasCoach, setHasCoach] = useState(true);
  const [coachLoading, setCoachLoading] = useState(true);

  useEffect(() => {
    const fetchCoach = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(USER_API_ROUTES.GET_MY_COACH, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasCoach(res.data.hasCoach);
        setCoachInfo(res.data.data);
      } catch (error) {
        console.error("Failed to fetch coach info", error);
        setHasCoach(false);
      } finally {
        setCoachLoading(false);
      }
    };
    fetchCoach();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      coachId: coachInfo.coachId,
      appointmentTime: appointmentTime.toISOString(),
      durationMinutes: parseInt(durationMinutes),
      subject,
      description,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post(USER_API_ROUTES.POST_APPOINTMENT, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setOpenSnackbar(true);
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage("Coach đã có lịch trong thời gian này");
      } else {
        setErrorMessage("Đã xảy ra lỗi không xác định");
      }
      setErrorSnackbar(true);
    }
  };

  if (!isAuthenticated || premiumLoading || coachLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hasPremiumAccess) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Bạn cần nâng cấp lên gói <strong>Premium</strong> để tạo cuộc hẹn.
        </Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/premium")}
        >
          Nâng cấp gói Premium
        </Button>
      </Container>
    );
  }

  return (
    <>
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
        <Typography variant="h4">Tạo Cuộc Hẹn</Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/userDashboard")}
            sx={{ color: "white", borderColor: "white" }}
          >
            Quay lại dashboard
          </Button>
          <Button
            onClick={() => navigate("/appointments")}
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ color: "white", borderColor: "white" }}
          >
            Danh sách cuộc hẹn
          </Button>
        </Box>
      </Box>

      {!hasCoach && (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Alert severity="warning" sx={{ mb: 3 }}>
            Bạn chưa có huấn luyện viên. Vui lòng chọn huấn luyện viên trước khi
            đặt lịch hẹn.
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate("/coachlistpage")}
          >
            Chọn Huấn Luyện Viên
          </Button>
        </Container>
      )}

      {hasCoach && (
        <>
          {coachInfo && (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
              <Box p={2} border="1px solid #ccc" borderRadius={2} mb={2}>
                <Typography variant="h6" gutterBottom>
                  Huấn luyện viên của bạn
                </Typography>
                <Typography>
                  <strong>Tên:</strong> {coachInfo.name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {coachInfo.email}
                </Typography>
                <Typography>
                  <strong>Bằng cấp:</strong> {coachInfo.qualifications}
                </Typography>
                <Typography>
                  <strong>Kinh nghiệm:</strong> {coachInfo.experience}
                </Typography>
                <Typography>
                  <strong>Giới thiệu:</strong> {coachInfo.bio}
                </Typography>
                <Typography>
                  <strong>Đánh giá:</strong> {coachInfo.rating} ⭐
                </Typography>
                <Alert severity="info" sx={{ mt: 1 }}>
                  Bạn nên trao đổi với huấn luyện viên của bạn trước khi đặt
                  lịch.
                </Alert>
              </Box>
            </Container>
          )}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
              <Box display="flex" flexDirection="column" gap={2}>
                <DateTimePicker
                  label="Thời gian cuộc hẹn"
                  value={appointmentTime}
                  onChange={(newValue) => setAppointmentTime(newValue)}
                  minDateTime={new Date()}
                  renderInput={(params) => <TextField {...params} />}
                />

                <TextField
                  label="Thời lượng (phút)"
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                  inputProps={{ min: 1 }}
                />

                <TextField
                  label="Chủ đề"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

                <TextField
                  label="Mô tả"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Button variant="contained" onClick={handleSubmit}>
                  Gửi cuộc hẹn
                </Button>
              </Box>

              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  Cuộc hẹn đã được gửi!
                </Alert>
              </Snackbar>

              <Snackbar
                open={errorSnackbar}
                autoHideDuration={3000}
                onClose={() => setErrorSnackbar(false)}
              >
                <Alert severity="error" sx={{ width: "100%" }}>
                  {errorMessage}
                </Alert>
              </Snackbar>
            </Container>
          </LocalizationProvider>
        </>
      )}
    </>
  );
};

export default CreateAppointment;
