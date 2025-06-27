import { COMMON_API, USER_API_ROUTES } from "@/api/apiRouter";
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
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
function Feed({ post }) {
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser || false);
  const username = localStorage.getItem("username");
  const handleToggleLike = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${COMMON_API.LIKE_POST}/${post.postId}/toggle-like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLiked((prev) => !prev);
      setLikesCount((prev) => prev + (isLiked ? -1 : 1)); // isLiked ở đây là giá trị cũ
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  return (
    <Card key={post.postId} variant="outlined">
      <CardHeader
        avatar={<Avatar>{post.authorName.charAt(0).toUpperCase()}</Avatar>}
        action={
          username === post.authorName && (
            <Tooltip title="Tuỳ chọn">
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </Tooltip>
          )
        }
        title={<Typography fontWeight={600}>{post.authorName}</Typography>}
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
                  sx={{
                    mr: 0.75,
                    color: isLiked ? "primary.main" : undefined,
                  }}
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
    </Card>
  );
}
export default Feed;
