import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { BotToTop, FadeIn } from "../Animations/animations";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
function FeaturesSection() {
  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        pt: 10,
        pb: 10,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <BotToTop>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: 800 }}
            >
              How To My Program Works
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "secondary.main",
                mt: 1,
                mb: 2,
              }}
            >
              Our scientifically-backed approach helps you quit smoking
              permanently through a personalized journey
            </Typography>
          </BotToTop>
        </Box>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: { xs: "wrap", md: "nowrap" },
            mt: 4,
          }}
        >
          <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
            <BotToTop>
              <Box
                sx={{
                  height: "100%",
                  borderTop: "10px solid",
                  borderTopColor: "primary.main",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
                  borderRadius: 2,
                  p: 4,
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CalendarMonthIcon
                  sx={{
                    fontSize: "4rem",
                    color: "primary.main",
                    bgcolor: "primary.light",
                    borderRadius: "50%",
                    p: 2,
                    mb: 2,
                    alignSelf: "flex-start",
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                  Personalized Plan
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "secondary.main", flexGrow: 1 }}
                >
                  We create a custom quitting plan based on your smoking habits,
                  triggers, and personal goals.
                </Typography>
              </Box>
            </BotToTop>
          </Grid>

          {/* Second Card */}
          <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
            <BotToTop delay={0.3}>
              <Box
                sx={{
                  height: "100%",
                  borderTop: "10px solid",
                  borderTopColor: "primary.main",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
                  borderRadius: 2,
                  p: 4,
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <GroupsOutlinedIcon
                  sx={{
                    fontSize: "4rem",
                    color: "primary.main",
                    bgcolor: "primary.light",
                    borderRadius: "50%",
                    p: 2,
                    mb: 2,
                    alignSelf: "flex-start",
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                  Community Support
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "secondary.main", flexGrow: 1 }}
                >
                  Connect with others through our supportive community and
                  expert coaches.
                </Typography>
              </Box>
            </BotToTop>
          </Grid>

          {/* Third Card */}
          <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
            <BotToTop delay={0.6}>
              <Box
                sx={{
                  height: "100%",
                  borderTop: "10px solid",
                  borderTopColor: "primary.main",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
                  borderRadius: 2,
                  p: 4,
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <WorkspacePremiumOutlinedIcon
                  sx={{
                    fontSize: "4rem",
                    color: "primary.main",
                    bgcolor: "primary.light",
                    borderRadius: "50%",
                    p: 2,
                    mb: 2,
                    alignSelf: "flex-start",
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                  Progress Tracking
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "secondary.main", flexGrow: 1 }}
                >
                  Track your progress, celebrate milestones, and see the health
                  benefits in real-time.
                </Typography>
              </Box>
            </BotToTop>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
