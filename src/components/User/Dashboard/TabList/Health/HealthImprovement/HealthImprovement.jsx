import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

function HealthImprovement({ date, content, value }) {
  const timeStamp = new Date(date).toISOString().split("T")[0];
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h5"
        sx={{ mb: 1, color: "primary.dark", textAlign: "center" }}
      >
        {content}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="body2">{value}%</Typography>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{
              height: 15,
              borderRadius: 5,
              bgcolor: "rgba(0,0,0,0.1)",
              "& .MuiLinearProgress-bar": {
                bgcolor: value === 100 ? "primary.main" : "#f4a28c",
              },
            }}
          />
        </Box>
        <Typography variant="body2">100%</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ mt: 0.5, ml: { xs: 0, md: 5 } }} variant="body2">
          remain {timeStamp} to {content}
        </Typography>
      </Box>
    </Box>
  );
}

export default HealthImprovement;
