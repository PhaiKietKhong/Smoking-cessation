// src/pages/ClientDiary.jsx
import { COACH_API_ROUTES } from "@/api/apiRouter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import dayjs from "dayjs";

const BASE_URL = `${COACH_API_ROUTES.GET_DIARY_USER}`;

const ClientDiary = () => {
  const { clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [editingNotes, setEditingNotes] = useState({});
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchDiary = async () => {
    try {
      const res = await axios.get(
        `${COACH_API_ROUTES.GET_DIARY_USER}/${clientId}/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            fromDate: dayjs().startOf("month").format("YYYY-MM-DD"),
            toDate: dayjs().endOf("month").format("YYYY-MM-DD"),
            page: 1,
            pageSize: 100,
          },
        }
      );
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Lỗi khi tải nhật ký:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCoachNoteChange = (id, value) => {
    setEditingNotes((prev) => ({ ...prev, [id]: value }));
  };
  const saveCoachNote = async (progressId) => {
    const note = editingNotes[progressId];
    if (!note) return;

    try {
      await axios.put(
        `${COACH_API_ROUTES.SENDNOTES_DIARY_USER}/${clientId}/progress/${progressId}/notes`,
        { coachNotes: note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSnackbarMessage("Lưu ghi chú thành công!");
      setSnackbarOpen(true);
      fetchDiary();
    } catch (err) {
      setSnackbarMessage("Lưu ghi chú thất bại.");
      setSnackbarOpen(true);
    }
  };
  useEffect(() => {
    fetchDiary();
  }, [clientId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return <Typography align="center">Không có dữ liệu</Typography>;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
        <Typography variant="h4">
          Nhật ký của {data.clientName} ({data.clientEmail})
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/coachDashboard")}
          sx={{ color: "white", borderColor: "white" }}
        >
          Quay lại dashboard
        </Button>
      </Box>
      <Container maxWidth sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {data.progressRecords.map((diaryData) => (
            <Grid key={diaryData.progressId} size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 3, mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {formatDate(diaryData.date)}
                  </Typography>
                </Box>

                {/* Part 1 */}
                <Grid container spacing={2} sx={{ my: 2 }}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                        bgcolor: "rgba(255, 0, 0, 0.2)",
                        color: "#b30000",
                        boxShadow: "none",
                      }}
                    >
                      <Typography variant="body2">Điểm sức khoẻ</Typography>
                      <Typography variant="h5" fontWeight="800">
                        {diaryData.healthScore}/10
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                        bgcolor: "rgba(255, 255, 0, 0.2)",
                        color: "#ffaa00",
                        boxShadow: "none",
                      }}
                    >
                      <Typography variant="body2">
                        Số tiền đã tiết kiệm
                      </Typography>
                      <Typography variant="h6" fontWeight="800">
                        {diaryData.moneySaved.toLocaleString()} VND
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                        bgcolor: "primary.light",
                        color: "primary.main",
                        boxShadow: "none",
                      }}
                    >
                      <Typography variant="body2">Thuốc tránh được</Typography>
                      <Typography variant="h5" fontWeight="800">
                        {diaryData.cigarettesAvoided}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>

                {/* Part 2 */}
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2">
                      Tâm trạng: <b>{diaryData.mood}/10</b>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2">
                      Thèm thuốc: <b>{diaryData.cravingLevel}/5</b>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2">
                      Stress: <b>{diaryData.stressLevel ?? "1"}/5</b>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2">
                      Ngủ: <b>{diaryData.sleepHours} giờ</b>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2">
                      Cân nặng: <b>{diaryData.weight} kg</b>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2">
                      Thể dục: <b>{diaryData.exerciseMinutes} phút</b>
                    </Typography>
                  </Grid>
                </Grid>

                {/* Part 3 */}
                <Card
                  sx={{
                    p: 2,
                    mt: 2,
                    bgcolor: "rgba(216,216,216,0.2)",
                    color: "#4f4f4f",
                    boxShadow: "none",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{ md: 6 }}>
                      <Typography variant="body2" fontWeight={600}>
                        Ghi chú:
                      </Typography>
                      <TextField
                        fullWidth
                        sx={{ mt: 1 }}
                        size="small"
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}
                        value={diaryData.notes || "-"}
                      ></TextField>
                    </Grid>
                    <Grid size={{ md: 6 }}>
                      <Typography variant="body2" fontWeight={600}>
                        Ghi chú từ huấn luyện viên:
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        multiline
                        value={
                          editingNotes[diaryData.progressId] ??
                          diaryData.coachNotes ??
                          ""
                        }
                        onChange={(e) =>
                          handleCoachNoteChange(
                            diaryData.progressId,
                            e.target.value
                          )
                        }
                        placeholder="Nhập ghi chú..."
                        sx={{ mt: 1 }}
                      />
                      <Box display="flex" justifyContent="flex-end" mt={1}>
                        <Button
                          variant="contained"
                          onClick={() => saveCoachNote(diaryData.progressId)}
                          sx={{ width: "100%" }}
                        >
                          Lưu ghi chú
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ClientDiary;
