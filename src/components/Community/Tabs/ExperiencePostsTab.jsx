import { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import { COMMON_API } from "@/api/apiRouter";
import axios from "axios";
import Feed from "../Feed/Feed";

export default function ExperiencePostsTab({ reload }) {
  const [posts, setPosts] = useState([]);

  const fetchExperience = async () => {
    try {
      const res = await axios.get(
        `${COMMON_API.GET_EXPERIENCE_POST}/Chia sẻ kiến thức`
      );
      setPosts(res.data);
    } catch (err) {
      console.error("Lỗi tải bài chia sẻ kiến thức:", err);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, [reload]);

  return posts.length > 0 ? (
    <Stack spacing={4} mt={4}>
      {posts.map((post) => (
        <Feed key={post.postId} post={post} onReload={fetchExperience} />
      ))}
    </Stack>
  ) : (
    <Typography variant="body1" mt={4}>
      Không có bài chia sẻ kiến thức nào.
    </Typography>
  );
}
