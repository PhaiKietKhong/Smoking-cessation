import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MovingIcon from "@mui/icons-material/Moving";
function QuickStat() {
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
              <Typography variant="body2">No smoking day</Typography>
              <EventNoteIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Typography variant="h4" sx={{ textAlign: "start" }}>
              50
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "start" }}>
              Since 11/11/2025
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
              <Typography variant="body2">Money saved</Typography>
              <AttachMoneyIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Typography variant="h4" sx={{ textAlign: "start" }}>
              200.000 ₫
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "start" }}>
              ~ 20.000 ₫/Day
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
              <Typography variant="body2">
                Number of cigrarettes avoided
              </Typography>
              <MovingIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Typography variant="h4" sx={{ textAlign: "start" }}>
              940
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "start" }}>
              ~20 cigrarettes/Day
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default QuickStat;
