import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";

function FormerSmokeData() {
  const token = localStorage.getItem("token");
  const [value, setValue] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    quitDate: null,
    cigarettesPerDay: "",
    costPerPack: "",
    cigarettesPerPack: "",
  });
  const [errors, setErrors] = useState({
    cigarettesPerDay: "",
    cigarettesPerPack: "",
    costPerPack: "",
  });
  const handleDateChange = (newValue) => {
    setFormData((prev) => ({ ...prev, quitDate: newValue }));
  };
  const handleFormData = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;
    if (name === "cigarettesPerDay" && value > 100) validatedValue = 100;
    if (name === "cigarettesPerPack" && value > 50) validatedValue = 50;
    if (name === "packPrice" && value > 1000000) validatedValue = 1000000;

    setFormData((prev) => ({ ...prev, [name]: validatedValue }));
  };
  const navigate = useNavigate();

  const payload = {
    quitDate: formData.quitDate ? formData.quitDate.toISOString() : null,
    cigarettesPerDay: Number(formData.cigarettesPerDay),
    costPerPack: Number(formData.costPerPack),
    cigarettesPerPack: Number(formData.cigarettesPerPack),
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get(
        USER_API_ROUTES.POST_SMOKING_STATUS,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowAlert(true);
    } catch (error) {}
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "cigarettesPerDay":
        if (value < 1) error = "Số lượng phải lớn hơn 0";
        else if (value > 100) error = "Số lượng không được vượt quá 100";
        break;
      case "cigarettesPerPack":
        if (value < 1) error = "Số lượng phải lớn hơn 0";
        else if (value > 50) error = "Số lượng không được vượt quá 50";
        break;
      case "costPerPack":
        if (value < 1000) error = "Giá phải từ 1,000đ trở lên";
        else if (value > 1000000) error = "Giá không được vượt quá 1,000,000đ";
        break;
      default:
        break;
    }
    return error;
  };
  const handleNavigate = () => {
    navigate("/userDashBoard");
  };

  useEffect(() => {
    const getSmokingStatus = async () => {
      try {
        const response = await axios.get(USER_API_ROUTES.GET_SMOKING_STATUS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setFormData({
          quitDate: dayjs(response.data.quitDate), // Convert to dayjs object for DateTimePicker
          cigarettesPerDay: response.data.cigarettesPerDay,
          cigarettesPerPack: response.data.cigarettesPerPack,
          costPerPack: response.data.costPerPack,
        });
      } catch (error) {
        navigate("/login");
      }
    };
    getSmokingStatus();
  }, []);

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
        <Typography variant="h4">Former Smoke Data</Typography>
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
        {/* Note Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            p: 2,
            borderRadius: 2,
            bgcolor: "#fff7ed",
            border: "1px solid #fed7aa",
          }}
        >
          <WarningAmberIcon sx={{ color: "#c2410c", mt: "2px" }} />
          <Typography variant="body2" sx={{ color: "#7c2d12" }}>
            <strong>Lưu ý quan trọng:</strong> Việc cập nhật dữ liệu của bạn sẽ
            thay đổi tất cả số liệu thống kê hiện tại của bạn. Hãy đảm bảo thông
            tin đã nhập là chính xác.
          </Typography>
        </Box>

        {/* Inputs */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Ngày bỏ thuốc"
              value={formData.quitDate}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>

        <TextField
          label="Số lượng thuốc lá mỗi ngày"
          value={formData.cigarettesPerDay}
          name="cigarettesPerDay"
          onChange={handleFormData}
          type="number"
          error={!!errors.cigarettesPerDay}
          helperText={errors.cigarettesPerDay || "Từ 1 đến 100 điếu mỗi ngày"}
          inputProps={{
            min: 1,
            max: 100,
            step: 1,
          }}
        />
        <TextField
          label="Số lượng thuốc lá trong mỗi gói"
          name="cigarettesPerPack"
          value={formData.cigarettesPerPack}
          onChange={handleFormData}
          type="number"
          error={!!errors.cigarettesPerPack}
          helperText={errors.cigarettesPerPack || "Từ 1 đến 50 điếu mỗi gói"}
          inputProps={{
            min: 1,
            max: 50,
            step: 1,
          }}
        />
        <TextField
          label="Giá gói thuốc"
          name="costPerPack"
          value={formData.costPerPack}
          onChange={handleFormData}
          type="number"
          error={!!errors.costPerPack}
          helperText={errors.costPerPack || "Từ 1,000đ đến 1,000,000đ"}
          inputProps={{
            min: 1000,
            max: 1000000,
            step: 1000,
          }}
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
              bgcolor: "rgb(253, 74, 74)",
              ":hover": { bgcolor: "#EA2F14" },
            }}
            startIcon={<SaveIcon />}
            onClick={handleUpdate} // ⬅️ thêm sự kiện click
          >
            Cập nhật
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
          Cập nhật thành công
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FormerSmokeData;
