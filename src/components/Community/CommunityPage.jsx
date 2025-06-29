import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";

// Fake data (replace with API call if needed)
const fakePosts = [
  {
    postId: 3,
    accountId: 1,
    title: "chia sẻ bí quyết",
    content: ".........",
    category: "chia sẻ",
    status: "Published",
    viewCount: 0,
    createdAt: "2025-06-27T04:02:48.8007885",
    updatedAt: "2025-06-27T04:02:48.8007886",
    authorName: "k123",
    authorUsername: "k123",
    likesCount: 0,
    commentsCount: 0,
    isLikedByCurrentUser: false,
  },
  {
    postId: 2,
    accountId: 1,
    title: "test",
    content: "qqqqqq",
    category: "string",
    status: "Published",
    viewCount: 0,
    createdAt: "2025-06-27T03:09:37.66547",
    updatedAt: "2025-06-27T03:09:37.66547",
    authorName: "k123",
    authorUsername: "k123",
    likesCount: 0,
    commentsCount: 0,
    isLikedByCurrentUser: false,
  },
];

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setPosts(fakePosts);
  }, []);

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.postId === postId
          ? {
              ...p,
              isLikedByCurrentUser: !p.isLikedByCurrentUser,
              likesCount: p.likesCount + (p.isLikedByCurrentUser ? -1 : 1),
            }
          : p
      )
    );
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Bảng tin
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.postId}>
            <Card variant="outlined">
              <CardHeader
                avatar={
                  <Avatar>{post.authorName.charAt(0).toUpperCase()}</Avatar>
                }
                title={post.authorName}
                subheader={dayjs(post.createdAt).format("DD/MM/YYYY HH:mm")}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {post.content}
                </Typography>
                <Box mt={1}>
                  <Typography variant="caption" color="text.secondary">
                    Chủ đề: {post.category}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <IconButton onClick={() => handleLike(post.postId)}>
                  <ThumbUpIcon
                    color={post.isLikedByCurrentUser ? "primary" : "inherit"}
                  />
                </IconButton>
                <Typography variant="body2">{post.likesCount}</Typography>

                <IconButton>
                  <ChatBubbleOutlineIcon />
                </IconButton>
                <Typography variant="body2">{post.commentsCount}</Typography>

                <IconButton disabled>
                  <VisibilityIcon />
                </IconButton>
                <Typography variant="body2">{post.viewCount}</Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CommunityPage;
