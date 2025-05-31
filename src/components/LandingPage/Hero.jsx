import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { motion } from "motion/react";
import { LeftToRight, BotToTop } from "../Animations/animations";
function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom,#ffff, #005642)",
        pt: 16,
        pb: 10,
        backgroundImage:
          "url('https://www.smallsteps.org.nz/images/heros/hero-landing-desktop.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundColor: "primary.dark",
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

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 2,
            }}
          >
            <LeftToRight>
              <Typography
                sx={{
                  fontWeight: 900,
                  typography: { xs: "h3", md: "h2" },
                  textAlign: { xs: "center", md: "start" },
                  color: "#fff700", // vàng tươi nổi bật
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
                  letterSpacing: "0.03em",
                }}
              >
                Breathe Easier,
              </Typography>

              <Typography
                sx={{
                  fontWeight: 900,
                  typography: { xs: "h3", md: "h2" },
                  textAlign: { xs: "center", md: "start" },
                  color: "primary.light", // xanh lá neon nổi bật
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                  letterSpacing: "0.03em",
                }}
              >
                Live Longer
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: "#ffffff", // trắng cho văn bản dài
                  textAlign: { xs: "center", md: "start" },
                  fontSize: { xs: "0.95rem", md: "1.1rem" },
                  lineHeight: 1.7,
                  maxWidth: 550,
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
                }}
              >
                Join over <strong style={{ color: "#ffff66" }}>10,000+</strong>{" "}
                people who have quit smoking through our{" "}
                <strong style={{ color: "#90ee90" }}>
                  science-backed program
                </strong>
                . Begin your journey to a healthier, smoke-free life{" "}
                <strong style={{ color: "#ffa500" }}>today</strong>.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 4,
                  justifyContent: { xs: "center", md: "start" },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#368e38",
                    color: "white",
                    py: { xs: 0.5, sm: 1 },
                    px: { xs: 2, sm: 3 },
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    "&:hover": {
                      backgroundColor: "#2e7a31",
                    },
                  }}
                >
                  Start your journey
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "#ffffff",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </LeftToRight>
          </Grid>

          {/*right side */}
          <Grid size={{ xs: 12, md: 6 }} sx={{}}>
            <BotToTop>
              {/* <Box
                component="img"
                src="https://www.smallsteps.org.nz/images/tools/ss-how-to-active-listening.png"
                alt="Hero Image"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              /> */}
            </BotToTop>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;
