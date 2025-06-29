import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [preferredDate, setPreferredDate] = useState(new Date());
  const [meetingType, setMeetingType] = useState("");
  const [notes, setNotes] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    const payload = {
      preferredDate: preferredDate.toISOString(),
      meetingType,
      notes,
    };

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(USER_API_ROUTES.POST_APPOINTMENT, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setOpenSnackbar(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Coach đã có lịch trong thời gian này");
        setErrorSnackbar(true);
      } else {
        setErrorMessage("Đã xảy ra lỗi không xác định");
        setErrorSnackbar(true);
      }
    }
  };

  return (
    <>
      {/* Header  */}
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

      {/* Form content */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <DateTimePicker
              label="Thời gian mong muốn"
              value={preferredDate}
              onChange={(newValue) => setPreferredDate(newValue)}
              minDateTime={new Date()}
              renderInput={(params) => <TextField {...params} />}
            />

            <TextField
              select
              label="Loại cuộc hẹn"
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
            >
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="offline">Offline</MenuItem>
              <MenuItem value="call">Gọi điện</MenuItem>
            </TextField>

            <TextField
              label="Ghi chú"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
  );
};

export default CreateAppointment;
