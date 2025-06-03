import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { LeftToRight, BotToTop } from "../Animations/animations";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/400.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const handleNavigate = (value) => {
    switch (value) {
      case "onBoardingPage":
        navigate("/onBoardingPage");
        break;
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "primary.dark",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        px: 4,
        mt: 7,
        py: { xs: 10, sm: 16 },
      }}
    >
      {/* Background image layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: { xs: "60vh", sm: "70vh", md: "80vh" },
          backgroundImage: `url('https://www.smallsteps.org.nz/images/heros/hero-landing-desktop.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          },
        }}
      />

      {/* Content layer */}
      <Container maxWidth="md" sx={{ zIndex: 1 }}>
        <BotToTop>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: isSmall ? "1rem" : isMedium ? "1.5rem" : "2rem",
              color: "primary.light",
              textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            Join more than 10 million people
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: isSmall ? "1rem" : isMedium ? "1.5rem" : "2rem",
              color: "primary.light",
              textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            who have already quit smoking
          </Typography>

          <Button
            variant="contained"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: isSmall ? "1.2rem" : isMedium ? "1.5rem" : "2rem",
              px: isSmall ? 3 : 5,
              color: "primary.light",
              mt: 3,
            }}
            onClick={() => handleNavigate("onBoardingPage")}
          >
            Start Your Journey
          </Button>
        </BotToTop>
      </Container>
    </Box>
  );
}

export default Hero;
