import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Diary() {
  const [formData, setFormData] = useState({
    entryDate: dayjs(),
    smoked: "",
    cigarettesSmoked: "",
    nicotineCost: "",
    cravingCount: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({ ...prev, entryDate: newValue }));
  };

  const handleSubmit = () => {
    // Fake save function
    setShowAlert(true);
  };

  const handleNavigate = () => {
    navigate("/userDashboard");
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          bgcolor: "primary.main",
          color: "primary.light",
          gap: 2,
        }}
      >
        <ArrowBackIosNewIcon
          sx={{ cursor: "pointer" }}
          onClick={handleNavigate}
        />
        <Typography variant="h4">Nhật ký theo dõi</Typography>
      </Box>

      {/* Main Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          px: { xs: 10, md: 30, lg: 50 },
          mt: 4,
        }}
      >
        {/* Entry Date */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Ngày ghi nhận"
              value={formData.entryDate}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>

        {/* Smoked? */}
        <FormControl fullWidth>
          <InputLabel>Bạn đã hút thuốc chưa?</InputLabel>
          <Select
            name="smoked"
            value={formData.smoked}
            label="Bạn đã hút thuốc chưa?"
            onChange={handleChange}
          >
            <MenuItem value="yes">Có</MenuItem>
            <MenuItem value="no">Không</MenuItem>
          </Select>
        </FormControl>

        {/* Cigarettes smoked if "yes" */}
        {formData.smoked === "yes" && (
          <TextField
            label="Số điếu thuốc đã hút"
            name="cigarettesSmoked"
            type="number"
            value={formData.cigarettesSmoked}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />
        )}

        {/* Nicotine therapy cost */}
        <TextField
          label="Số tiền đã chi cho liệu pháp thay thế nicotine (VNĐ)"
          name="nicotineCost"
          type="number"
          value={formData.nicotineCost}
          onChange={handleChange}
          inputProps={{ min: 0, step: 1000 }}
        />

        {/* Craving count */}
        <TextField
          label="Số lần bạn cảm thấy thèm thuốc hôm nay"
          name="cravingCount"
          type="number"
          value={formData.cravingCount}
          onChange={handleChange}
          inputProps={{ min: 0 }}
        />

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={handleNavigate}
            variant="outlined"
            sx={{ flexGrow: 1 }}
          >
            Huỷ bỏ
          </Button>
          <Button
            variant="contained"
            sx={{
              flexGrow: 1,
            }}
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Lưu lại
          </Button>
        </Box>
      </Box>

      {/* Snackbar Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Đã lưu thành công!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Diary;
