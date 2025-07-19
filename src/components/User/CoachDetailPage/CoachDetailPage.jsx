import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { COMMON_API, USER_API_ROUTES } from "@/api/apiRouter";

// Ảnh theo coachId
const fallbackImages = {
  1: "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2020/03/2-1024x1024-1.png",
  2: "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2020/04/1-1024x1024-1.png",
  3: "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2024/05/bs-danh.png",
  1003: "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2024/05/z5424931406358_9e55cf51bece9d08587dd3367618504c-768x864.jpg",
  default:
    "https://phongkhamdakhoaphuduc.com/wp-content/uploads/2020/04/40e797b7bf15444b1d04-768x705.jpg",
};

export default function CoachDetailPage() {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const navigate = useNavigate();

  // Lấy accountId từ API
  const fetchAccountId = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(USER_API_ROUTES.GET_SMOKING_STATUS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAccountId(res.data.accountId);
    } catch (err) {
      setAccountId(null);
    }
  };

  // Lấy coach và feedback
  const fetchCoach = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(COMMON_API.GET_COACHES, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const allCoaches = res.data.data || [];
      const foundCoach = allCoaches.find((c) => String(c.coachId) === id);
      setCoach(foundCoach || null);

      // API feedback
      const feedbackRes = await axios.get(
        `${USER_API_ROUTES.GET_FEEDBACK}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Đảm bảo feedbacks là mảng
      setFeedbacks(Array.isArray(feedbackRes.data) ? feedbackRes.data : []);
    } catch (err) {
      setCoach(null);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoach();
    fetchAccountId();
    // eslint-disable-next-line
  }, [id]);

  // Gửi feedback
  const handleSubmitFeedback = async () => {
    if (!newRating || !newComment.trim() || !accountId) return;

    const newFeedback = {
      accountId: accountId,
      coachId: Number(id),
      content: newComment,
      rating: newRating,
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      await axios.post(USER_API_ROUTES.POST_FEEDBACK, newFeedback, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFeedbacks((prev) => [newFeedback, ...prev]);
      setNewComment("");
      setNewRating(0);
    } catch (err) {
      // Có thể show thông báo lỗi ở đây
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!coach) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Không tìm thấy huấn luyện viên.</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Quay lại
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
        <Typography variant="h4">Chi tiết Huấn luyện viên</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/CoachListPage")}
          sx={{ color: "white", borderColor: "white" }}
        >
          Quay lại danh sách
        </Button>
      </Box>
      <Container sx={{ mt: 4, mb: 6 }}>
        <Card sx={{ p: 3 }}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            gap={3}
            mb={3}
          >
            <CardMedia
              component="img"
              image={fallbackImages[coach.coachId] || fallbackImages.default}
              alt={coach.name}
              sx={{
                width: 160,
                height: 160,
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid #1976d2",
                boxShadow: 3,
              }}
            />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {coach.name}
              </Typography>
              <Typography variant="body2">{coach.email}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Bằng cấp:</strong> {coach.qualifications || "N/A"}
              </Typography>
              <Typography>
                <strong>Kinh nghiệm:</strong> {coach.experience || "N/A"}
              </Typography>
              <Typography>
                <strong>Khách hàng:</strong> {coach.totalClients}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Buổi hoàn thành:</strong> {coach.sessionsCompleted}
              </Typography>
              <Typography>
                <strong>Tiểu sử:</strong> {coach.bio || "Không có"}
              </Typography>
            </Grid>
          </Grid>
        </Card>

        <Box mt={5}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Viết đánh giá
          </Typography>
          <Card sx={{ p: 2, mb: 3 }}>
            <Rating
              value={newRating}
              onChange={(e, newValue) => setNewRating(newValue)}
            />
            <TextField
              multiline
              rows={3}
              fullWidth
              margin="normal"
              label="Nội dung đánh giá"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSubmitFeedback}
              disabled={submitting || !newRating || !newComment.trim()}
            >
              {submitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </Card>

          <Typography variant="h6" fontWeight={700} gutterBottom>
            Phản hồi từ khách hàng
          </Typography>
          {feedbacks.length === 0 ? (
            <Typography>Chưa có phản hồi nào.</Typography>
          ) : (
            feedbacks.map((fb, index) => (
              <Card key={index} sx={{ mt: 2, p: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Rating value={fb.rating} readOnly size="small" />
                  <Typography variant="caption">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2">{fb.content}</Typography>
              </Card>
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
}
