import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { BotToTop } from "../Animations/animations";
import Avatar from "@mui/material/Avatar";
function StoryPage() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundImage:
          "url('https://www.smallsteps.org.nz/images/curves/top-curve-dark-green-landing.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "primary.light",
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <BotToTop>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: 800,
                color: "primary.light",
              }}
            >
              Success Stories
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "primary.light",
                mt: 1,
                mb: 4,
              }}
            >
              Hear from people who have successfully quit smoking with our
              program
            </Typography>
          </BotToTop>
        </Box>

        {/*story*/}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <BotToTop>
            <Box
              sx={{
                width: "100%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px ",
                p: 4,
                borderRadius: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    Sarah J.
                  </Typography>
                  <Typography variant="body2">
                    Smoke-free for 2 years
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontStyle: "italic", mt: 2 }}>
                "After smoking for 15 years, I never thought I could quit. This
                program made it possible with its personalized approach and
                supportive community."
              </Typography>
            </Box>
          </BotToTop>
          <BotToTop>
            <Box
              sx={{
                width: "100%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px ",
                p: 4,
                borderRadius: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    Michael T.
                  </Typography>
                  <Typography variant="body2">Smoke-free for 1 year</Typography>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontStyle: "italic", mt: 2 }}>
                "The progress tracking and health insights kept me motivated. I
                can now run 5k without getting winded - something I couldn't
                imagine before."
              </Typography>
            </Box>
          </BotToTop>
          <BotToTop>
            <Box
              sx={{
                width: "100%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px ",
                p: 4,
                borderRadius: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    Elena R.
                  </Typography>
                  <Typography variant="body2">
                    Smoke-free for 6 months
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontStyle: "italic", mt: 2 }}>
                "The cravings management techniques were a game-changer. I've
                saved over $1,200 already and my sense of taste and smell has
                completely returned!"
              </Typography>
            </Box>
          </BotToTop>
        </Box>
      </Container>
    </Box>
  );
}

export default StoryPage;
