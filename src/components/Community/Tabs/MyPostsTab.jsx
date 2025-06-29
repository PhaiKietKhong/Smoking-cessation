import { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import axios from "axios";
import Feed from "../Feed/Feed";
import { COMMON_API } from "@/api/apiRouter";

export default function MyPostsTab({ reload }) {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(COMMON_API.GET_MY_POSTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(res.data);
    } catch (err) {
      console.error("Lỗi tải bài viết của tôi:", err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [reload]);

  return posts.length > 0 ? (
    <Stack spacing={4} mt={4}>
      {posts.map((post) => (
        <Feed key={post.postId} post={post} onReload={fetchMyPosts} />
      ))}
    </Stack>
  ) : (
    <Typography variant="body1" mt={4}>
      Bạn chưa có bài viết nào.
    </Typography>
  );
}
