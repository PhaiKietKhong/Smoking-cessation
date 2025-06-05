import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { AnimatedProgress } from "../../../Animations/animations";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Chart from "./Chart";
function Progress() {
  return (
    <Box sx={{ color: "primary.light", mt: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: 2,
              bgcolor: "primary.main",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography variant="h4">Current Target</Typography>
            <Typography variant="body2">3 Months no smoking</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                mb: 1,
              }}
            >
              <Typography variant="body2">Progress</Typography>
              <Typography variant="body2">50/90 Day (20%)</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: "rgba(0,0,0,0.1)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "white",
                },
              }}
            />
            <Typography sx={{ mt: 2 }} variant="body2">
              40 days to reach goal
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: 2,
              bgcolor: "primary.main",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography variant="h4">Plan this week</Typography>
            <Typography sx={{ mb: 2 }} variant="body2">
              List of plans
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <FiberManualRecordIcon sx={{ fontSize: "1rem" }} />
              <Typography variant="body2">List of plans</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <FiberManualRecordIcon sx={{ fontSize: "1rem" }} />
              <Typography variant="body2">List of plans</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <FiberManualRecordIcon sx={{ fontSize: "1rem" }} />
              <Typography variant="body2">List of plans</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <FiberManualRecordIcon sx={{ fontSize: "1rem" }} />
              <Typography variant="body2">List of plans</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          my: 2,
          p: 2,
          bgcolor: "primary.main",
          color: "primary.light",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4">Chart progress</Typography>
        <Typography variant="body2">Day of quit smoke</Typography>
        <Chart />
      </Box>
    </Box>
  );
}

export default Progress;
