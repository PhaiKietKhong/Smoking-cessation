import { Box, Chip, Grid, Typography } from "@mui/material";
import React from "react";

function Achievement({ title, icon, isObtain, unlockedAt, badgeColor }) {
  const isEmoji = typeof icon === "string" && icon.length <= 4;

  return (
    <Grid
      size={{ xs: 12, md: 4 }}
      sx={{
        bgcolor: isObtain ? badgeColor : "",
        borderRadius: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "250px",
        color: isObtain ? "primary.light" : "black",
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          border: "2px solid grey",
          borderColor: isObtain ? "primary.light" : "",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          filter: isObtain ? "none" : "grayscale(100%)",
        }}
      >
        {isEmoji ? (
          <Typography fontSize={32}>{icon}</Typography>
        ) : (
          <img
            src={icon}
            alt={title}
            style={{
              width: 32,
              height: 32,
              filter: isObtain ? "none" : "grayscale(100%)",
            }}
          />
        )}
      </Box>

      <Typography variant="body1" sx={{ my: 2, fontWeight: 600 }}>
        {title}
      </Typography>

      {isObtain ? (
        <Chip
          label="Obtained"
          sx={{ bgcolor: "primary.light", mb: 2, color: "primary.main" }}
        />
      ) : (
        <Chip sx={{ mb: 2 }} label="Chưa Đạt Được" variant="outlined" />
      )}

      {isObtain ? (
        <Typography variant="body2" sx={{ mb: 2 }}>
          Ngày đạt được: {unlockedAt}
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ mb: 2 }}>
          Cố Gắng lên!!
        </Typography>
      )}
    </Grid>
  );
}

export default Achievement;
