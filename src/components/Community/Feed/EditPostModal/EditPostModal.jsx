import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { COMMON_API } from "@/api/apiRouter";

export default function EditPostModal({ open, onClose, post, onReload }) {
  const [form, setForm] = useState({
    title: post.title,
    content: post.content,
    category: post.category,
  });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${COMMON_API.PUT_MY_POST}/${post.postId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onReload?.();
      onClose();
    } catch (error) {
      console.error("Cập nhật thất bại:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
          Chỉnh sửa bài viết
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Tiêu đề"
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="Nội dung"
            fullWidth
            multiline
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Chủ đề</InputLabel>
            <Select
              value={form.category}
              label="Chủ đề"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <MenuItem value="Bài viết">Bài viết</MenuItem>
              <MenuItem value="Chia sẻ kiến thức">Chia sẻ kiến thức</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title || !form.content || !form.category}
          >
            Cập nhật
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
