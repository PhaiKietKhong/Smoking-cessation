import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Achievement from "./Achievement.jsx/Achievement";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";

function AchievementList({ achievements }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  useEffect(() => {
    const fetchUnlockedAchievements = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          USER_API_ROUTES.GET_UNLOCKED_ACHIEVEMENTS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUnlockedAchievements(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thành tựu đã mở khóa", error);
      }
    };

    fetchUnlockedAchievements();
  }, []);

  // Tạo Map để dễ tra cứu achievementId
  const unlockedMap = new Map(
    unlockedAchievements.map((item) => [item.achievementId, item])
  );

  return (
    <Box>
      <Grid container spacing={3} sx={{ my: 3 }}>
        {achievements.map((item, index) => {
          const unlockedItem = unlockedMap.get(item.achievementId);
          return (
            <Achievement
              key={item.achievementId}
              title={item.name}
              icon={item.icon}
              isObtain={!!unlockedItem?.isUnlocked}
              unlockedAt={unlockedItem?.unlockedAt}
              badgeColor={unlockedItem?.badgeColor || "#ccc"}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

export default AchievementList;
