import { Box, Grid } from "@mui/material";
import React from "react";
import Achievement from "./Achievement.jsx/Achievement";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import SmokeFreeOutlinedIcon from "@mui/icons-material/SmokeFreeOutlined";

function AchievementList({ achievements }) {
  if (!achievements) {
    return <div></div>;
  }
  console.log(achievements);
  return (
    <Box>
      <Grid container spacing={3} sx={{ my: 3 }}>
        {achievements.map((item, index) => (
          <Achievement
            key={index}
            title={item.name}
            icon={item.icon}
            isObtain={item.isUnlocked}
            dateObtain={item.dateObtain}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default AchievementList;
