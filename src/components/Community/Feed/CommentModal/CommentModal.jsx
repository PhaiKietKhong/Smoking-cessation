import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
  Divider,
  TextField,
  Button,
  Stack,
  Card,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { COMMON_API } from "@/api/apiRouter";

export default function CommentModal({ open, onClose, postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${COMMON_API.GET_COMMENTS}/${postId}/comments`
      );
      setComments(res.data);
    } catch (err) {
      console.error("Lỗi tải bình luận:", err);
    }
  };

  const handleSendComment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    if (!newComment.trim()) return;

    try {
      setLoading(true);
      await axios.post(
        `${COMMON_API.POST_COMMENT}/${postId}/comments`,
        { content: newComment, parentId: null },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment("");
      await fetchComments(); // refresh
    } catch (err) {
      console.error("Lỗi gửi bình luận:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchComments();
  }, [open]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            width: "90%",
            maxWidth: 600,
            mx: "auto",
            mt: 10,
            boxShadow: 24,
            maxHeight: "80vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Bình luận</Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              fullWidth
              size="small"
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              inputProps={{ maxLength: 200 }}
            />
            <Button
              variant="contained"
              onClick={handleSendComment}
              disabled={!newComment.trim() || loading}
              sx={{ py: 1 }}
            >
              Gửi
            </Button>
          </Stack>

          <Divider />

          {comments.length === 0 ? (
            <Typography variant="body2">Chưa có bình luận nào.</Typography>
          ) : (
            <List>
              {comments.map((comment, index) => (
                <div key={comment.commentId}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        {comment.authorName?.charAt(0)?.toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <Card
                      sx={{
                        py: 1,
                        px: 2,
                        width: "100%",
                        bgcolor: "#f0f2f5",
                        borderRadius: 4,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography fontWeight={600}>
                            {comment.authorName}
                          </Typography>
                        }
                        secondary={comment.content}
                      />
                    </Card>
                  </ListItem>
                  {index < comments.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          )}
        </Box>
      </Modal>

      {/* Modal nhắc đăng nhập */}
      <Modal open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            width: "90%",
            maxWidth: 400,
            mx: "auto",
            mt: 12,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            Bạn cần đăng nhập để bình luận
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
