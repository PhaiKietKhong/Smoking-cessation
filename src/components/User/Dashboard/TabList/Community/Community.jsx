import { COMMON_API, USER_API_ROUTES } from "@/api/apiRouter";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
function Community() {
  const token = localStorage.getItem("token");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
  });
  const handleOpen = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNewPost({ title: "", content: "", category: "" });
    setLoading(false);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(COMMON_API.CREATE_POST, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSnackbar({
        open: true,
        message: "Đăng bài thành công!",
        severity: "success",
      });

      handleClose(); // đóng modal và reset
      getPost(); // gọi lại API để cập nhật danh sách bài viết
    } catch (error) {
      console.error("Lỗi đăng bài:", error);
      setLoading(false);
      setSnackbar({
        open: true,
        message: "Đăng bài thất bại. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  const getPost = async () => {
    try {
      const response = await axios.get(USER_API_ROUTES.GET_POSTS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <Box sx={{ my: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              py: 3,
              px: 3,
              color: "secondary.dark",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: "black", mb: 1 }}
            >
              Chia sẻ câu truyện của bạn
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Truyền cảm hứng cho cộng đồng bằng câu chuyện của bạn
            </Typography>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar />
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Hãy chia sẻ trải nghiệm và kiến thức của bạn!"
                  onClick={handleOpen}
                  InputProps={{
                    readOnly: true,
                    sx: { borderRadius: "20px", backgroundColor: "#f0f2f5" },
                  }}
                />
              </Stack>
              <Divider sx={{ my: 1 }} />
            </Paper>
          </Box>
        </Grid>
        {/*right side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              py: 3,
              px: 3,
              color: "secondary.dark",
              height: "100%", // Make box fill grid height
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: "black", mb: 1 }}
            >
              Hoạt động cộng đồng
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Chia sẻ gần đây từ các thành viên khác
            </Typography>

            {posts ? (
              posts.slice(0, 2).map((post) => (
                <>
                  <Box
                    sx={{
                      bgcolor: "#f5f5f5",
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Typography
                        variant="body1"
                        sx={{ color: "black", fontWeight: 400 }}
                      >
                        {post.authorName}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{post.content}</Typography>
                  </Box>
                </>
              ))
            ) : (
              <></>
            )}

            <Button onClick={() => navigate("/community")} variant="outlined">
              Xem thêm
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* Modal đăng bài */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            width: "90%",
            maxWidth: 500,
            mx: "auto",
            mt: 10,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Đăng bài mới
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Tiêu đề"
              fullWidth
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <TextField
              label="Nội dung"
              fullWidth
              multiline
              rows={4}
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel>Chủ đề</InputLabel>
              <Select
                value={newPost.category}
                label="Chủ đề"
                onChange={(e) =>
                  setNewPost({ ...newPost, category: e.target.value })
                }
              >
                <MenuItem value="Bài viết">Bài viết</MenuItem>
                <MenuItem value="Chia sẻ kiến thức">Chia sẻ kiến thức</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={
                !newPost.title ||
                !newPost.content ||
                !newPost.category ||
                loading
              }
            >
              {loading ? "Đang đăng..." : "Đăng bài"}
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* Snackbar hiển thị khi đăng bài */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Community;
