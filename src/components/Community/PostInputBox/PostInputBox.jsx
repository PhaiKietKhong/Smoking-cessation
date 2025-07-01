import {
  Avatar,
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { COMMON_API } from "@/api/apiRouter";

export default function PostInputBox({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

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

      onSubmit(); // Notify parent to refresh
      handleClose();
    } catch (error) {
      console.error("Lỗi đăng bài:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Ô nhập bài viết */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mt: 3,
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

      {/* Modal xác nhận đăng nhập */}
      <Modal open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            width: "90%",
            maxWidth: 450,
            mx: "auto",
            mt: 12,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            Bạn cần đăng nhập để đăng bài viết
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={() => {
                setShowLoginPrompt(false);
                window.location.href = "/login";
              }}
            >
              Đăng nhập
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowLoginPrompt(false)}
            >
              Tiếp tục xem
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
