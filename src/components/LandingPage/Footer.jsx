import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  IconButton,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import { Air, Twitter, Facebook, Instagram } from "@mui/icons-material";
import { Logo } from "../Logo/Logo";

function Footer() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundImage:
          "url('https://www.smallsteps.org.nz/_next/image?url=%2Fimages%2Fdividers%2Fdivider-tekapo.webp&w=3840&q=75')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "primary.light",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Logo />
            </Box>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Helping people quit smoking and live healthier lives since 2018.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Program
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                How It Works
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Features
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Pricing
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Success Stories
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Resources
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Blog
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Research
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Tools
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                FAQ
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                About Us
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Careers
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Contact
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Privacy Policy
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box textAlign="center">
          <Typography color="text.secondary" variant="body2">
            &copy; {new Date().getFullYear()} QuitSmart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
