// ModalEditDiary.jsx (Updated with fixed validation logic and PUT request)
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";
import { useNavigate } from "react-router-dom";

export default function ModalEditDiary({ open, onClose, diaryData }) {
  const [formData, setFormData] = useState({ ...diaryData });
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios(USER_API_ROUTES.GET_SMOKING_STATUS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Lỗi lấy user data", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (diaryData) {
      setFormData(diaryData);
    }
  }, [diaryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "cigarettesAvoided",
      "moneySaved",
      "healthScore",
      "mood",
      "cravingLevel",
      "weight",
      "exerciseMinutes",
      "sleepHours",
      "notes",
    ];

    requiredFields.forEach((field) => {
      const val = formData[field];
      if (val === null || val === undefined || val === "") {
        newErrors[field] = "Không được để trống";
      }
    });

    [
      "cigarettesAvoided",
      "moneySaved",
      "weight",
      "exerciseMinutes",
      "sleepHours",
    ].forEach((key) => {
      const val = parseFloat(formData[key]);
      if (!isNaN(val) && val < 0) {
        newErrors[key] = "Giá trị không được âm";
      }
    });

    if (userData) {
      const ca = parseFloat(formData.cigarettesAvoided);
      const ms = parseFloat(formData.moneySaved);

      if (!isNaN(ca) && ca > userData.cigarettesPerDay) {
        newErrors.cigarettesAvoided = `Không vượt quá ${userData.cigarettesPerDay}`;
      }

      if (!isNaN(ms) && ms > userData.dailySavings) {
        newErrors.moneySaved = `Không vượt quá ${userData.dailySavings.toLocaleString()} VNĐ`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    console.log(diaryData.progressId);

    const token = localStorage.getItem("token");
    const payload = {
      ...formData,
      date: diaryData.date,
      cigarettesAvoided: parseInt(formData.cigarettesAvoided),
      moneySaved: parseInt(formData.moneySaved),
      healthScore: parseInt(formData.healthScore),
      mood: parseInt(formData.mood),
      cravingLevel: parseInt(formData.cravingLevel),
      weight: parseFloat(formData.weight),
      exerciseMinutes: parseInt(formData.exerciseMinutes),
      sleepHours: parseFloat(formData.sleepHours),
    };

    try {
      await axios.put(
        `${USER_API_ROUTES.PUT_DAILY_PROGRESS}/${diaryData.progressId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShowAlert(true);
      setTimeout(() => onClose(true), 1000);
    } catch (err) {
      console.error("Lỗi gửi dữ liệu", err);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Chỉnh sửa nhật ký</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Số điếu tránh được"
            name="cigarettesAvoided"
            type="number"
            value={formData.cigarettesAvoided}
            onChange={handleChange}
            error={!!errors.cigarettesAvoided}
            helperText={errors.cigarettesAvoided}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Tiền tiết kiệm (VNĐ)"
            name="moneySaved"
            type="number"
            value={formData.moneySaved}
            onChange={handleChange}
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
            <InputLabel>Tâm trạng</InputLabel>
            <Select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              label="Tâm trạng"
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <MenuItem key={val} value={val}>
                  {val} -{" "}
                  {val === 1
                    ? "Rất tệ"
                    : val === 2
                    ? "Tệ"
                    : val === 3
                    ? "Bình thường"
                    : val === 4
                    ? "Tốt"
                    : "Rất tốt"}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="error">
              {errors.mood}
            </Typography>
          </FormControl>
          <FormControl fullWidth error={!!errors.cravingLevel}>
            <InputLabel>Thèm thuốc</InputLabel>
            <Select
              name="cravingLevel"
              value={formData.cravingLevel}
              onChange={handleChange}
              label="Thèm thuốc"
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <MenuItem key={val} value={val}>
                  {val} -{" "}
                  {val === 1
                    ? "Không thèm"
                    : val === 2
                    ? "Hơi thèm"
                    : val === 3
                    ? "Trung Bình"
                    : val === 4
                    ? "Rất thèm"
                    : val === 5
                    ? "Cực kỳ thèm"
                    : null}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="error">
              {errors.cravingLevel}
            </Typography>
          </FormControl>
          <FormControl fullWidth error={!!errors.healthScore}>
            <InputLabel>Sức khoẻ</InputLabel>
            <Select
              name="healthScore"
              value={formData.healthScore}
              onChange={handleChange}
              label="Sức khoẻ"
            >
              {[
                "Rất yếu",
                "Yếu",
                "Trung bình",
                "Khá",
                "Tốt",
                "Rất Tốt",
                "Tuyệt vời",
                "Cực khoẻ",
                "Sức sống cao",
                "Cực kỳ khoẻ mạnh",
              ].map((label, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1} - {label}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="error">
              {errors.healthScore}
            </Typography>
          </FormControl>
          <TextField
            label="Cân nặng (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            error={!!errors.weight}
            helperText={errors.weight}
          />
          <TextField
            label="Tập thể dục (phút)"
            name="exerciseMinutes"
            type="number"
            value={formData.exerciseMinutes}
            onChange={handleChange}
            error={!!errors.exerciseMinutes}
            helperText={errors.exerciseMinutes}
          />
          <TextField
            label="Ngủ (giờ)"
            name="sleepHours"
            type="number"
            value={formData.sleepHours}
            onChange={handleChange}
            error={!!errors.sleepHours}
            helperText={errors.sleepHours}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Huỷ</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Lưu lại
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity="success">Cập nhật thành công!</Alert>
      </Snackbar>
    </>
  );
}
