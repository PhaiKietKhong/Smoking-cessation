import {
  Box,
  Button,
  Container,
  InputAdornment,
  LinearProgress,
  Typography,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import dayjs from "dayjs";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_API_ROUTES } from "@/api/apiRouter";

function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [quitDate, setQuitDate] = useState(null);
  const [cigaretteCount, setCigaretteCount] = useState("");
  const [cigarettesInAPack, setCigarettesInAPack] = useState("");
  const [priceOfThePack, setPriceOfThePack] = useState("");
  const [yearsOfSmoking, setYearsOfSmoking] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const formatNumber = (number) => {
    number = Math.round(parseFloat(number));
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const submitData = async () => {
    const token = localStorage.getItem("token");
    const payload = {
      quitDate: quitDate?.toISOString(),
      cigarettesPerDay: Number(cigaretteCount),
      costPerPack: Number(priceOfThePack),
      cigarettesPerPack: Number(cigarettesInAPack),
      yearsOfSmoking: Number(yearsOfSmoking),
    };

    try {
      await axios.post(USER_API_ROUTES.POST_SMOKING_STATUS, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/userDashBoard");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const canProcess = () => {
    switch (currentStep) {
      case 1:
        return quitDate !== null;
      case 2:
        return Number(cigaretteCount) > 0;
      case 3:
        return Number(cigarettesInAPack) > 0;
      case 4:
        return Number(priceOfThePack) > 0;
      case 5:
        return Number(yearsOfSmoking) > 0;
      default:
        return true;
    }
  };

  const renderTextField = (label, value, setValue, max = 100) => (
    <TextField
      label={label}
      type="number"
      value={value}
      variant="outlined"
      fullWidth
      onChange={(e) =>
        setValue(Math.min(Math.max(Number(e.target.value), 0), max))
      }
      sx={{
        bgcolor: "#f9fafb",
        borderRadius: 2,
        mt: 2,
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "primary.main" },
          "&:hover fieldset": { borderColor: "primary.dark" },
          "&.Mui-focused fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  );

  const renderStep = () => {
    const summaryItem = (label, value) => (
      <Box
        sx={{
          p: 2,
          bgcolor: "#f9fafb",
          borderRadius: 2,
          border: "1px solid #e2e8f0",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography fontWeight={600}>{value}</Typography>
      </Box>
    );

    switch (currentStep) {
      case 1:
        return (
          <>
            <Typography variant="h5" fontWeight={700}>
              Bạn bỏ thuốc lá khi nào?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Chọn ngày bạn dự định bỏ thuốc lá
            </Typography>
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Ngày bỏ thuốc"
                  value={quitDate}
                  onChange={setQuitDate}
                  sx={{
                    width: "100%",
                    bgcolor: "#f9fafb",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "primary.main" },
                      "&:hover fieldset": { borderColor: "primary.dark" },
                      "&.Mui-focused fieldset": { borderColor: "primary.main" },
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h5" fontWeight={700}>
              Bạn hút bao nhiêu điếu thuốc mỗi ngày?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Nhập số lượng trung bình mỗi ngày
            </Typography>
            {renderTextField(
              "Số điếu thuốc mỗi ngày",
              cigaretteCount,
              setCigaretteCount
            )}
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h5" fontWeight={700}>
              Một gói có bao nhiêu điếu thuốc?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Nhập số lượng trong một gói
            </Typography>
            {renderTextField(
              "Điếu thuốc / gói",
              cigarettesInAPack,
              setCigarettesInAPack
            )}
          </>
        );
      case 4:
        return (
          <>
            <Typography variant="h5" fontWeight={700}>
              Giá một gói thuốc là bao nhiêu?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Nhập giá tiền (VNĐ)
            </Typography>
            <TextField
              label="Giá tiền"
              type="number"
              value={priceOfThePack}
              fullWidth
              variant="outlined"
              onChange={(e) =>
                setPriceOfThePack(
                  Math.min(Math.max(Number(e.target.value), 0), 10000000)
                )
              }
              InputProps={{
                endAdornment: <InputAdornment position="end">₫</InputAdornment>,
              }}
              sx={{
                bgcolor: "#f9fafb",
                borderRadius: 2,
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "primary.main" },
                  "&:hover fieldset": { borderColor: "primary.dark" },
                  "&.Mui-focused fieldset": { borderColor: "primary.main" },
                },
              }}
            />
          </>
        );
      case 5:
        return (
          <>
            <Typography variant="h5" fontWeight={700}>
              Bạn đã hút thuốc bao nhiêu năm?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Nhập số năm trước khi bỏ thuốc
            </Typography>
            {renderTextField(
              "Số năm hút thuốc",
              yearsOfSmoking,
              setYearsOfSmoking
            )}
          </>
        );
      case 6:
        const daily = cigaretteCount * (priceOfThePack / cigarettesInAPack);
        return (
          <>
            <Typography variant="h5" fontWeight={700}>
              Tóm tắt thông tin của bạn
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              {summaryItem(
                "Ngày bỏ thuốc",
                quitDate?.format("YYYY/MM/DD HH:mm")
              )}
              {summaryItem("Số điếu mỗi ngày", cigaretteCount)}
              {summaryItem("Điếu / gói", cigarettesInAPack)}
              {summaryItem("Giá / gói", `${formatNumber(priceOfThePack)}₫`)}
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "primary.light",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="primary.main" fontWeight={700}>
                Số tiền tiết kiệm
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                }}
              >
                {[1, 7, 30, 365].map((days, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      p: 2,
                      bgcolor: "#fff",
                      borderRadius: 2,
                      border: "1px dashed #ccc",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {days === 1
                        ? "Mỗi ngày"
                        : days === 7
                        ? "Mỗi tuần"
                        : days === 30
                        ? "Mỗi tháng"
                        : "Mỗi năm"}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      color="primary.main"
                    >
                      {formatNumber(daily * days)}₫
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        );
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        minHeight: "100vh",
        py: 4,
        overflowY: "hidden",
      }}
    >
      <Container>
        <Box
          sx={{
            width: "100%",
            maxWidth: 700,
            mx: "auto",
            bgcolor: "#ffffff",
            borderRadius: 3,
            boxShadow: 3,
            p: isMobile ? 3 : 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "85vh",
          }}
        >
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight={700}>
                Khảo sát của bạn
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentStep}/6
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={currentStep * (100 / 6)}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: "#e2e8f0",
                mb: 2,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "primary.main",
                },
              }}
            />

            {renderStep()}
          </Box>

          <Box mt={4}>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              >
                Quay lại
              </Button>

              <Button
                variant="contained"
                endIcon={currentStep === 6 ? null : <ArrowForwardIosIcon />}
                onClick={
                  currentStep === 6
                    ? submitData
                    : () => setCurrentStep((prev) => prev + 1)
                }
                disabled={!canProcess()}
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {currentStep === 6 ? "Gửi" : "Tiếp theo"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default OnboardingPage;
