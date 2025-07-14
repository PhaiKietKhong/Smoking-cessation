// DiaryList.jsx
import { USER_API_ROUTES } from "@/api/apiRouter";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardDiary from "./CardDiary/CardDiary";
import { useAuthCheck } from "@/Hooks/useAuthCheck";
function DiaryList() {
  const [listDiary, setListDiary] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const isValid = useAuthCheck({ requiredRole: "User" });
  const navigate = useNavigate();

  const fetchListDiary = async () => {
    const endDate = dayjs().format("YYYY-MM-DD");
    const startDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        USER_API_ROUTES.GET_USER_PROGESS_BY_DATE_RANGE,
        {
          params: { startDate, endDate },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setListDiary(res.data);
    } catch (error) {
      console.error("Lỗi khi load danh sách nhật ký", error);
    }
  };

  useEffect(() => {
    fetchListDiary();
  }, []);

  if (!isValid) return null;

  if (!listDiary)
    return (
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Hiện tại bạn chưa viết nhật ký
      </Typography>
    );

  return (
    <div>
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
        <Typography variant="h4">Nhật ký của bạn</Typography>
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
            onClick={() => navigate("/diary")}
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ color: "white", borderColor: "white" }}
          >
            Viết nhật ký
          </Button>
        </Box>
      </Box>

      <Container
        maxWidth
        sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}
      >
        <Grid container spacing={3}>
          {listDiary.length > 0 ? (
            listDiary.map((diary, i) => (
              <CardDiary key={i} diaryData={diary} onUpdated={fetchListDiary} />
            ))
          ) : (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Hiện tại bạn chưa viết nhật ký
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default DiaryList;
