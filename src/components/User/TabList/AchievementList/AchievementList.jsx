import { Box, Grid } from "@mui/material";
import React from "react";
import Achievement from "./Achievement.jsx/Achievement";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import SmokeFreeOutlinedIcon from "@mui/icons-material/SmokeFreeOutlined";
const achievements = [
  {
    title: "Health - Pulse Rate Stable",
    icon: HealthAndSafetyOutlinedIcon,
    dateObtain: "2025-06-01",
    isObtain: true,
  },
  {
    title: "Health - Oxygen Level Normal",
    icon: HealthAndSafetyOutlinedIcon,
    dateObtain: "2025-05-28",
    isObtain: true,
  },
  {
    title: "Money Saved - 100,000 VND",
    icon: AttachMoneyOutlinedIcon,
    dateObtain: "2025-06-03",
    isObtain: true,
  },
  {
    title: "Money Saved - 1,000,000 VND",
    icon: AttachMoneyOutlinedIcon,
    dateObtain: null,
    isObtain: false,
  },
  {
    title: "Diary - 1 Week Logged",
    icon: LocalLibraryOutlinedIcon,
    dateObtain: "2025-05-20",
    isObtain: true,
  },
  {
    title: "Diary - 1 Month Logged",
    icon: LocalLibraryOutlinedIcon,
    dateObtain: null,
    isObtain: false,
  },
  {
    title: "Diary - 1 Year Logged",
    icon: LocalLibraryOutlinedIcon,
    dateObtain: null,
    isObtain: false,
  },
  {
    title: "No Smoke - 1 Week",
    icon: SmokeFreeOutlinedIcon,
    dateObtain: "2025-06-01",
    isObtain: true,
  },
  {
    title: "No Smoke - 1 Month",
    icon: SmokeFreeOutlinedIcon,
    dateObtain: null,
    isObtain: false,
  },
  {
    title: "No Smoke - 1 Year",
    icon: SmokeFreeOutlinedIcon,
    dateObtain: null,
    isObtain: false,
  },
];

function AchievementList() {
  return (
    <Box>
      <Grid container spacing={3} sx={{ my: 3 }}>
        {achievements.map((item, index) => (
          <Achievement
            key={index}
            title={item.title}
            icon={item.icon}
            isObtain={item.isObtain}
            dateObtain={item.dateObtain}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default AchievementList;
