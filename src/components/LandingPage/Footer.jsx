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
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/800.css";
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
              Giúp mọi người bỏ thuốc lá và sống khỏe mạnh hơn từ năm 2025.
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
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, fontFamily: "Be Vietnam Pro", mb: 2 }}
            >
              Chương trình
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Cách hoạt động
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Tính năng
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Giá cả
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Câu chuyện thành công
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, fontFamily: "Be Vietnam Pro", mb: 2 }}
            >
              Tài nguyên
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
                Nghiên cứu
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Công cụ
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Câu hỏi thường gặp
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, fontFamily: "Be Vietnam Pro", mb: 2 }}
            >
              Công ty
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Về chúng tôi
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Tuyển dụng
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Liên hệ
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                Chính sách bảo mật
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box textAlign="center">
          <Typography color="text.secondary" variant="body2">
            &copy; {new Date().getFullYear()} QuitSmart. Mọi quyền được bảo lưu.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
