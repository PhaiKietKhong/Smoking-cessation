import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import StarIcon from "@mui/icons-material/Star";
import ArticleIcon from "@mui/icons-material/Article";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TodayIcon from "@mui/icons-material/Today";
import { ADMIN_API_ROUTES } from "@/api/apiRouter";

export default function Dashboard() {
  const [generalStats, setGeneralStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatistics = async () => {
    try {
      const token = localStorage.getItem("token");

      const [generalRes, userRes] = await Promise.all([
        axios.get(ADMIN_API_ROUTES.GET_STATISTICS, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(ADMIN_API_ROUTES.GET_STATISTICS_USERS, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setGeneralStats(generalRes.data);
      setUserStats(userRes.data);
    } catch (err) {
      console.error("Lỗi tải thống kê:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);
  console.log(setGeneralStats);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  const StatCard = ({ icon, label, value, color = "primary" }) => (
    <Card
      elevation={3}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 3,
        bgcolor: "background.default",
        minHeight: 120,
      }}
    >
      <Box color={`${color}.main`}>{icon}</Box>
      <Box>
        <Typography variant="h6">{value}</Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Card>
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Bảng Thống Kê Quản Trị
      </Typography>

      <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 4 }}>
        <Typography variant="h6" gutterBottom>
          Tổng Quan
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<GroupIcon />}
              label="Tổng người dùng"
              value={generalStats.totalUsers}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<AdminPanelSettingsIcon />}
              label="Số Admin"
              value={generalStats.totalAdmins}
              color="secondary"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<StarIcon />}
              label="Số HLV"
              value={generalStats.totalCoaches}
              color="warning"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<ArticleIcon />}
              label="Bài viết"
              value={generalStats.totalPosts}
              color="info"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<EmojiEventsIcon />}
              label="Thành tựu"
              value={generalStats.totalAchievements}
              color="success"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<CheckCircleIcon />}
              label="Kế hoạch bỏ thuốc"
              value={generalStats.totalQuitPlans}
              color="success"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<CheckCircleIcon />}
              label="Lượt ghi nhận tiến độ"
              value={generalStats.totalProgressRecords}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h6" gutterBottom>
          Người Dùng
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<GroupIcon />}
              label="Người dùng bị chặn"
              value={userStats.blockedUsers}
              color="error"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<TodayIcon />}
              label="Người mới hôm nay"
              value={userStats.newUsersToday}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<TodayIcon />}
              label="Người mới tuần này"
              value={userStats.newUsersThisWeek}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<TodayIcon />}
              label="Người mới tháng này"
              value={userStats.newUsersThisMonth}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<StarIcon />}
              label="Tài khoản Premium"
              value={userStats.premiumUsers}
              color="warning"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<StarIcon />}
              label="Tài khoản Basic"
              value={userStats.basicUsers}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<CheckCircleIcon />}
              label="Đang theo kế hoạch bỏ thuốc"
              value={userStats.usersWithActiveQuitPlans}
              color="success"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<CheckCircleIcon />}
              label="Hoàn thành kế hoạch"
              value={userStats.usersWithCompletedQuitPlans}
              color="info"
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
