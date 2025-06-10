import {
  Box,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HealthImprovement from "./HealthImprovement/HealthImprovement";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Health() {
  const [openHealthStatus, setOpenHealthStatus] = useState(false);
  const handleOpen = () => {
    setOpenHealthStatus(!openHealthStatus);
  };
  const healthData = [
    {
      date: 1749100800000, // 2025-06-05
      content: "Improved blood oxygen level",
      value: 100,
    },
    {
      date: 1749187200000, // 2025-06-06
      content: "Pulse rate stabilized",
      value: 85,
    },
    {
      date: 1749273600000, // 2025-06-07
      content: "Whiter teeth",
      value: 67,
    },
    {
      date: 1749360000000, // 2025-06-08
      content: "Carbon monoxide level reduced",
      value: 82,
    },
    {
      date: 1749446400000, // 2025-06-09
      content: "Nicotine level decreased",
      value: 90,
    },
    {
      date: 1749532800000, // 2025-06-10
      content: "Improved taste and smell",
      value: 73,
    },
    {
      date: 1749619200000, // 2025-06-11
      content: "Easier breathing",
      value: 80,
    },
  ];
  const recoveryMilestones = [
    {
      time: "First 20 minutes",
      description: "Heart rate and blood pressure decrease",
      color: "#1976d2",
    },
    {
      time: "12 hours",
      description: "Carbon monoxide level in blood normalizes",
      color: "#2e7d32",
    },
    {
      time: "2–12 weeks",
      description: "Blood circulation improves",
      color: "#f9a825",
    },
    {
      time: "1–9 months",
      description: "Coughing and shortness of breath decrease",
      color: "#d32f2f",
    },
  ];

  return (
    <Box sx={{ my: 3 }}>
      {!openHealthStatus ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
                color: "secondary.dark",
                height: "100%", // Make box fill grid height
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}
                >
                  <FavoriteBorderIcon sx={{ color: "pink" }} />
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: "black", mb: 1 }}
                  >
                    Improve health
                  </Typography>
                </Box>
                <Link onClick={handleOpen} sx={{ cursor: "pointer" }}>
                  See more
                </Link>
              </Box>
              <Typography sx={{ mb: 2 }} variant="body2">
                Positive changes in the body
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                {" "}
                {/* This box will expand to fill space */}
                {healthData.slice(0, 4).map((item, index) => {
                  return (
                    <HealthImprovement
                      key={index}
                      value={item.value}
                      content={item.content}
                      date={item.date}
                    />
                  );
                })}
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
                color: "secondary.dark",
                height: "100%", // Make box fill grid height
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}
                >
                  <FavoriteBorderIcon sx={{ color: "pink" }} />
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: "black", mb: 1 }}
                  >
                    Health benefits over time
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ mb: 2 }} variant="body2">
                What has happened and will happen to your body
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "background.paper",
                  }}
                >
                  {recoveryMilestones.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              sx={{ color: item.color }}
                            >
                              {item.time}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < recoveryMilestones.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 1,
            py: 3,
            px: 10,
            color: "secondary.dark",
            height: "100%", // Make box fill grid height
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <ArrowBackIcon
            onClick={handleOpen}
            sx={{ position: "absolute", left: 20, top: 20 }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {" "}
            {/* This box will expand to fill space */}
            {healthData.map((item, index) => {
              return (
                <HealthImprovement
                  key={index}
                  value={item.value}
                  content={item.content}
                  date={item.date}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Health;
