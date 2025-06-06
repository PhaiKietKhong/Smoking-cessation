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
import { useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";

function FormerSmokeData() {
  const [value, setValue] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = () => {
    setShowAlert(true);
  };
  const handleNavigate = () => {
    navigate("/userDashBoard");
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
        <Typography variant="h4">Former Smoke Data</Typography>
      </Box>

      {/* Main Form */}
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, px: 50, mt: 4 }}
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
            <strong>Important Note:</strong> Updating your data will change all
            your current statistics. Make sure the information entered is
            correct.
          </Typography>
        </Box>

        {/* Inputs */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Date of last smoked cigarettes"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField label="Daily amount of cigarettes" value={123} />
        <TextField label="Cigarettes per pack" value={123} />
        <TextField label="Pack price" value={123} />

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={handleNavigate}
            variant="outlined"
            sx={{ flexGrow: 1 }}
          >
            Cancel
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
            Update data
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
          Update successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FormerSmokeData;
