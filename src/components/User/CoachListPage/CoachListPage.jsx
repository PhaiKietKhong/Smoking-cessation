import { COMMON_API } from "@/api/apiRouter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import WorkIcon from "@mui/icons-material/Work";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import usePremiumAccess from "@/hooks/usePremiumAccess";

const fallbackImages = [
  "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2020/03/2-1024x1024-1.png",
  "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2020/04/1-1024x1024-1.png",
  "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2024/05/bs-danh.png",
  "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2024/05/z5424931406358_9e55cf51bece9d08587dd3367618504c-768x864.jpg",
  "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2020/04/40e797b7bf15444b1d04-768x705.jpg",
];

export default function CoachListPage() {
  const { isValid: isAuthenticated, isChecking } = useAuthCheck({
    requiredRole: "User",
  });
  const { hasPremiumAccess, loading: premiumLoading } = usePremiumAccess();

  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const handleCardClick = (coachId) => {
    navigate(`/coach/${coachId}`);
  };

  const handleAssignCoach = async (coach) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${COMMON_API.ASSIGN_COACH}/${coach.coachId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSnackbar({
        open: true,
        message: `Đã chọn huấn luyện viên ${coach.name} thành công!`,
        severity: "success",
      });
    } catch (error) {
      console.error("Gán huấn luyện viên thất bại:", error);
      setSnackbar({
        open: true,
        message: "Gán huấn luyện viên thất bại.",
        severity: "error",
      });
    }
  };

  const fetchCoaches = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(COMMON_API.GET_COACHES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoaches(res.data.data || []);
    } catch (error) {
      console.error("Lỗi tải danh sách huấn luyện viên:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && hasPremiumAccess && !premiumLoading && !isChecking) {
      fetchCoaches();
    }
  }, [isAuthenticated, hasPremiumAccess, premiumLoading, isChecking]);

  if (!hasPremiumAccess) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Bạn cần nâng cấp lên gói <strong>Premium</strong> để chọn huấn luyện
          viên.
        </Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/premium")}
        >
          Nâng cấp gói Premium
        </Button>
      </Container>
    );
  }

  return (
    <Box>
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
        <Typography variant="h4">Danh sách huấn luyện viên</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/userDashboard")}
          sx={{ color: "white", borderColor: "white" }}
        >
          Quay lại Dashboard
        </Button>
      </Box>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" mb={4} fontWeight={700} color="primary">
          Danh sách Huấn luyện viên
        </Typography>
        <Grid container spacing={4}>
          {coaches.map((coach, index) => (
            <Grid item size={{ xs: 12, md: 4 }} key={coach.coachId}>
              <Card
                onClick={() => handleCardClick(coach.coachId)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: 3,
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.025)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={fallbackImages[index % fallbackImages.length]}
                  alt={coach.name}
                  sx={{
                    height: 180,
                    width: "80%",
                    objectFit: "contain",
                    mx: "auto",
                    mt: 2,
                  }}
                />
                <CardContent sx={{ px: 3, py: 2, flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                    textAlign="center"
                    color="primary.main"
                  >
                    {coach.name}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={1.2} gap={1}>
                    <EmailIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2">{coach.email}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1.2} gap={1}>
                    <SchoolIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2">
                      <strong>Bằng cấp:</strong> {coach.qualifications || "N/A"}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="start" mb={1.2} gap={1}>
                    <InfoIcon sx={{ fontSize: 18, mt: "2px" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      <strong>Tiểu sử:</strong> {coach.bio}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1.2} gap={1}>
                    <GroupsIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2">
                      <strong>Khách hàng:</strong> {coach.totalClients}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1.2} gap={1}>
                    <EventAvailableIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2">
                      <strong>Buổi hoàn thành:</strong>{" "}
                      {coach.sessionsCompleted}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1} gap={1}>
                    <StarIcon sx={{ fontSize: 18, color: "#facc15" }} />
                    <Rating
                      value={coach.rating}
                      precision={0.5}
                      size="small"
                      readOnly
                      sx={{ mt: "1px" }}
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ px: 3, pb: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAssignCoach(coach);
                    }}
                    disabled={!coach.isAvailable}
                    sx={{
                      py: 1.2,
                      textTransform: "none",
                      fontWeight: 600,
                      bgcolor: coach.isAvailable ? "primary.main" : "grey.400",
                      "&:hover": {
                        bgcolor: coach.isAvailable
                          ? "primary.dark"
                          : "grey.500",
                      },
                    }}
                  >
                    {coach.isAvailable
                      ? "Chọn huấn luyện viên"
                      : "Không khả dụng"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity={snackbar.severity}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
