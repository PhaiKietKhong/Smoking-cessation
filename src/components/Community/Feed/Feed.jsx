import {
  ChatBubbleOutline,
  Favorite,
  MoreHoriz,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { COMMON_API } from "@/api/apiRouter";
import EditPostModal from "./EditPostModal/EditPostModal";
import CommentModal from "./CommentModal/CommentModal";

function Feed({ post, onReload }) {
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser || false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const username = localStorage.getItem("username");

  const handleToggleLike = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${COMMON_API.LIKE_POST}/${post.postId}/toggle-like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsLiked((prev) => !prev);
      setLikesCount((prev) => prev + (isLiked ? -1 : 1));
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${COMMON_API.DELETE_MY_POST}/${post.postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onReload?.(); // reload bài viết
    } catch (err) {
      console.error("Xoá bài viết thất bại:", err);
    } finally {
      handleMenuClose();
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar>{post.authorName.charAt(0).toUpperCase()}</Avatar>}
        action={
          username === post.authorUsername && (
            <>
              <Tooltip title="Tuỳ chọn">
                <IconButton onClick={handleMenuOpen}>
                  <MoreHoriz />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEdit}>Sửa</MenuItem>
                <MenuItem onClick={handleDelete}>Xoá</MenuItem>
              </Menu>
            </>
          )
        }
        title={
          <Typography fontWeight={600} sx={{ color: "primary.main" }}>
            {post.authorName}
          </Typography>
        }
        subheader={`ngày đăng ${new Date(post.createdAt).toLocaleString(
          "vi-VN"
        )}`}
      />

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" paragraph>
          {post.content}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Chủ đề: <strong>{post.category}</strong>
        </Typography>
      </CardContent>

      <Divider />

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Tooltip title={isLiked ? "Bỏ thích" : "Thích"}>
            <Button
              size="small"
              onClick={handleToggleLike}
              startIcon={
                <Favorite
                  sx={{ mr: 0.75, color: isLiked ? "primary.main" : undefined }}
                  fontSize="small"
                />
              }
              sx={{
                textTransform: "none",
                minWidth: "auto",
                px: 1.5,
                color: isLiked ? "primary.main" : "secondary.dark",
                py: 0.5,
              }}
            >
              {likesCount}
            </Button>
          </Tooltip>
          <Tooltip title="Bình luận">
            <Button
              size="small"
              onClick={() => setIsCommentOpen(true)} // mở modal
              startIcon={
                <ChatBubbleOutline sx={{ mr: 0.75 }} fontSize="small" />
              }
              sx={{
                textTransform: "none",
                minWidth: "auto",
                px: 1.5,
                color: "secondary.dark",
                py: 0.5,
              }}
            >
              {post.commentsCount}
            </Button>
          </Tooltip>

          <Button
            size="small"
            startIcon={<Share sx={{ mr: 0.75 }} fontSize="small" />}
            sx={{
              textTransform: "none",
              minWidth: "auto",
              px: 1.5,
              color: "secondary.dark",
              py: 0.5,
            }}
          >
            {post.viewCount}
          </Button>
        </Stack>
      </CardActions>

      <EditPostModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        post={post}
        onReload={onReload}
      />
      <CommentModal
        open={isCommentOpen}
        onClose={() => setIsCommentOpen(false)}
        postId={post.postId}
      />
    </Card>
  );
}

export default Feed;
