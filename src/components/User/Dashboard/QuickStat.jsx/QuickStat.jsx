import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MovingIcon from "@mui/icons-material/Moving";
import dayjs from "dayjs";
import { SmokeFree } from "@mui/icons-material";
function QuickStat({ userData }) {
  if (!userData || !userData.quitDate) {
    return <div></div>;
  }

  const formattedDate = dayjs(userData.quitDate).format("DD/MM/YYYY");
  const now = dayjs();
  const diffDays = dayjs().diff(dayjs(userData.quitDate), "day");
  const costPerDay =
    (userData.costPerPack / userData.cigarettesPerPack) *
    userData.cigarettesPerDay;

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(to right, #22c55e, #16a34a)",
              borderRadius: 2,
              color: "primary.light",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2">Ngày không hút thuốc</Typography>
              <EventNoteIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Typography variant="h4" sx={{ textAlign: "start" }}>
              {userData.smokeFreenDays}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "start" }}>
              từ {formattedDate}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(to right, #3b82f6, #2563eb)",
              borderRadius: 2,
              color: "primary.light",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2">Số tiền đã tiết kiệm </Typography>
              <AttachMoneyIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Typography variant="h4" sx={{ textAlign: "start" }}>
              {userData.moneySaved}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "start" }}>
              ~ {Math.floor(costPerDay)} ₫ /Ngày
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
              borderRadius: 2,
              color: "primary.light",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2">Số thuốc lá đã tránh được</Typography>
              <MovingIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Typography variant="h4" sx={{ textAlign: "start" }}>
              {userData.cigarettesAvoided}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "start" }}>
              ~ {userData.cigarettesPerDay} điếu thuốc /Ngày
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default QuickStat;
