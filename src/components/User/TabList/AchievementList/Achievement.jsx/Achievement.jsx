import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Chip from "@mui/material/Chip";
function Achievement({ title, icon, isObtain, dateObtain }) {
  return (
    <Grid
      size={{ xs: 12, md: 4 }}
      sx={{
        bgcolor: isObtain ? "primary.main" : "",
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
          "& > svg": {
            fontSize: 32,
            color: isObtain ? "primary.light" : "grey",
          },
        }}
      >
        <img
          src={`/icons/${icon}.svg`}
          alt={title}
          style={{
            width: 32,
            height: 32,
            filter: isObtain ? "none" : "grayscale(100%)",
          }}
        />
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
        <Chip sx={{ mb: 2 }} label="Not Obtained" variant="outlined" />
      )}

      {dateObtain ? (
        <Typography variant="body2" sx={{ mb: 2 }}>
          Date Obtained: {dateObtain}
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ mb: 2 }}>
          Try your best!!!
        </Typography>
      )}
    </Grid>
  );
}

export default Achievement;
