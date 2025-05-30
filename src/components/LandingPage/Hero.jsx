import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { motion } from "motion/react";
import { LeftToRight, BotToTop } from "../Animations/animations";
function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #ffffff,rgb(228,216,190))",
        pt: 16,
        pb: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{
            bgcolor: "transparent",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: "70vh",
            alignItems: "center",
          }}
        >
          {/*Left side */}

          <Grid size={{ xs: 12, md: 6 }} sx={{}}>
            <LeftToRight>
              <Typography
                sx={{
                  fontWeight: 800,
                  typography: {
                    xs: "h3",
                    md: "h2",
                  },
                  textAlign: { xs: "center", md: "start" },
                }}
              >
                Breathe Easier,
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  typography: {
                    xs: "h3",
                    md: "h2",
                  },
                  fontWeight: 800,
                  color: "primary.main",
                  textAlign: { xs: "center", md: "start" },
                }}
              >
                Live Longer
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 2, color: "secondary.main" }}
              >
                Join over 10,000 people who have successfully quit smoking with
                our scientifically-backed program. Start your journey to a
                healthier, smoke-free life today.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                  sx={{
                    color: "white",
                    py: { xs: 0.5, sm: 1 },
                    px: { xs: 1, sm: 2, md: 3 },
                    color: "white",
                    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                  }}
                  variant="contained"
                >
                  Start your journey
                </Button>
                <Button variant="outlined">Learn More</Button>
              </Box>
            </LeftToRight>
          </Grid>

          {/*right side */}
          <Grid size={{ xs: 12, md: 6 }} sx={{}}>
            <BotToTop>
              <Box
                component="img"
                src="https://blog.coccoc.com/wp-content/uploads/2025/04/1-dinh-nghia-absolute-cinema-1200x675.jpg"
                alt="Hero Image"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
            </BotToTop>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;
