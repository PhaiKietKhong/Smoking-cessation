import { USER_API_ROUTES } from "@/api/apiRouter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Diary() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [duplicateAlert, setDuplicateAlert] = useState(false);

  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    cigarettesAvoided: "",
    moneySaved: "",
    healthScore: "",
    notes: "",
    mood: "",
    cravingLevel: "",
    weight: "",
    exerciseMinutes: "",
    sleepHours: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await axios(USER_API_ROUTES.GET_SMOKING_STATUS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const {
      cigarettesAvoided,
      moneySaved,
      healthScore,
      mood,
      cravingLevel,
      weight,
      exerciseMinutes,
      sleepHours,
    } = formData;

    const parsed = (val) => parseFloat(val);

    Object.entries(formData).forEach(([key, val]) => {
      if (val === "" || val === null) {
        newErrors[key] = "Không được để trống";
      }
    });

    [
      "cigarettesAvoided",
      "moneySaved",
      "weight",
      "exerciseMinutes",
      "sleepHours",
    ].forEach((key) => {
      if (parsed(formData[key]) < 0) {
        newErrors[key] = "Giá trị không được âm";
      }
    });

    if (userData) {
      if (parsed(cigarettesAvoided) > userData.cigarettesPerDay) {
        newErrors.cigarettesAvoided = `Không được vượt quá ${userData.cigarettesPerDay}`;
      }
      if (parsed(moneySaved) > userData.dailySavings) {
        newErrors.moneySaved = `Không được vượt quá ${userData.dailySavings.toLocaleString()} VNĐ`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const token = localStorage.getItem("token");

    const payload = {
      date: dayjs(formData.date).toISOString(),
      cigarettesAvoided: parseInt(formData.cigarettesAvoided),
      moneySaved: parseInt(formData.moneySaved),
      healthScore: parseInt(formData.healthScore),
      notes: formData.notes,
      mood: parseInt(formData.mood),
      cravingLevel: parseInt(formData.cravingLevel),
      weight: parseFloat(formData.weight),
      exerciseMinutes: parseInt(formData.exerciseMinutes),
      sleepHours: parseFloat(formData.sleepHours),
    };

    try {
      await axios.post(USER_API_ROUTES.POST_DAILY_PROGRESS, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setShowAlert(true);
    } catch (err) {
      if (err?.response?.status === 500) {
        setDuplicateAlert(true);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  const handleNavigate = () => {
    navigate("/userDashboard");
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "auto" }}>
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
        <Typography variant="h4">Nhật ký hằng ngày </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleNavigate}
          sx={{ color: "white", borderColor: "white" }}
        >
          Quay lại Dashboard
        </Button>
      </Box>

      {/* Form */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          py: 4,
        }}
      >
        {/* Ngày */}
        <TextField
          label="Ngày viết nhật ký"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            max: dayjs().format("YYYY-MM-DD"),
          }}
          error={!!errors.date}
          helperText={errors.date}
        />

        <TextField
          label="Số điếu thuốc tránh được"
          name="cigarettesAvoided"
          type="number"
          value={formData.cigarettesAvoided}
          onChange={handleChange}
          inputProps={{
            min: 0,
            max: userData?.cigarettesPerDay ?? undefined,
          }}
          error={!!errors.cigarettesAvoided}
          helperText={errors.cigarettesAvoided}
        />

        <TextField
          label="Số tiền tiết kiệm được (VNĐ)"
          name="moneySaved"
          type="number"
          value={formData.moneySaved}
          onChange={handleChange}
          inputProps={{
            min: 0,
            max: userData?.dailySavings ?? undefined,
            step: 1000,
          }}
          error={!!errors.moneySaved}
          helperText={errors.moneySaved}
        />

        <TextField
          label="Ghi chú"
          name="notes"
          multiline
          rows={2}
          value={formData.notes}
          onChange={handleChange}
          error={!!errors.notes}
          helperText={errors.notes}
        />

        <FormControl fullWidth error={!!errors.mood}>
          <InputLabel>Mức độ tâm trạng</InputLabel>
          <Select
            name="mood"
            value={formData.mood}
            label="Mức độ tâm trạng"
            onChange={handleChange}
          >
            <MenuItem value={1}>1 - Rất tệ</MenuItem>
            <MenuItem value={2}>2 - Tệ</MenuItem>
            <MenuItem value={3}>3 - Bình thường</MenuItem>
            <MenuItem value={4}>4 - Tốt</MenuItem>
            <MenuItem value={5}>5 - Rất tốt</MenuItem>
          </Select>
          <Typography variant="caption" color="error">
            {errors.mood}
          </Typography>
        </FormControl>

        <FormControl fullWidth error={!!errors.cravingLevel}>
          <InputLabel>Mức độ thèm thuốc</InputLabel>
          <Select
            name="cravingLevel"
            value={formData.cravingLevel}
            label="Mức độ thèm thuốc"
            onChange={handleChange}
          >
            <MenuItem value={1}>1 - Không thèm</MenuItem>
            <MenuItem value={2}>2 - Hơi thèm</MenuItem>
            <MenuItem value={3}>3 - Trung bình</MenuItem>
            <MenuItem value={4}>4 - Rất thèm</MenuItem>
            <MenuItem value={5}>5 - Cực kỳ thèm</MenuItem>
          </Select>
          <Typography variant="caption" color="error">
            {errors.cravingLevel}
          </Typography>
        </FormControl>

        <FormControl fullWidth error={!!errors.healthScore}>
          <InputLabel>Mức độ sức khỏe</InputLabel>
          <Select
            name="healthScore"
            value={formData.healthScore}
            label="Mức độ sức khỏe"
            onChange={handleChange}
          >
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1} -{" "}
                {
                  [
                    "Rất yếu",
                    "Yếu",
                    "Trung bình",
                    "Khá",
                    "Tốt",
                    "Rất tốt",
                    "Tuyệt vời",
                    "Cực khỏe",
                    "Sức sống cao",
                    "Cực kỳ khỏe mạnh",
                  ][i]
                }
              </MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="error">
            {errors.healthScore}
          </Typography>
        </FormControl>

        <TextField
          label="Cân nặng hiện tại (kg)"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          inputProps={{ min: 0 }}
          error={!!errors.weight}
          helperText={errors.weight}
        />

        <TextField
          label="Thời gian tập thể dục (phút)"
          name="exerciseMinutes"
          type="number"
          value={formData.exerciseMinutes}
          onChange={handleChange}
          inputProps={{ min: 0 }}
          error={!!errors.exerciseMinutes}
          helperText={errors.exerciseMinutes}
        />

        <TextField
          label="Thời gian ngủ (giờ)"
          name="sleepHours"
          type="number"
          value={formData.sleepHours}
          onChange={handleChange}
          inputProps={{ min: 0 }}
          error={!!errors.sleepHours}
          helperText={errors.sleepHours}
        />

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={handleNavigate} variant="outlined" fullWidth>
            Huỷ bỏ
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
            fullWidth
          >
            Lưu lại
          </Button>
        </Box>
      </Container>

      {/* Snackbar thành công */}
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

      {/* Snackbar lỗi trùng */}
      <Snackbar
        open={duplicateAlert}
        autoHideDuration={4000}
        onClose={() => setDuplicateAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setDuplicateAlert(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Bạn đã viết nhật ký ngày hôm đấy rồi!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Diary;
