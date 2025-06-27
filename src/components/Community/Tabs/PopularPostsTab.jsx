import { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import { COMMON_API } from "@/api/apiRouter";
import axios from "axios";
import Feed from "../Feed/Feed";

export default function PopularPostsTab({ reload }) {
  const [posts, setPosts] = useState([]);

  const fetchPopular = async () => {
    try {
      const res = await axios.get(COMMON_API.GET_POPULAR_POSTS);
      setPosts(res.data);
    } catch (err) {
      console.error("Lỗi tải bài phổ biến:", err);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, [reload]);

  return posts.length > 0 ? (
    <Stack spacing={4} mt={4}>
      {posts.map((post) => (
        <Feed key={post.postId} post={post} />
      ))}
    </Stack>
  ) : (
    <Typography variant="body1" mt={4}>
      Không có bài viết phổ biến nào.
    </Typography>
  );
}
