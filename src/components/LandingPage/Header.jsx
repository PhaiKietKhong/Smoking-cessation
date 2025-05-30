import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Logo } from "../Logo/Logo";
import { useNavigate } from "react-router-dom";

function Header() {
  const pages = ["Products", "Pricing", "Blog"];
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "primary.light",
        backdropFilter: "blur(8px)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        color: "secondary.dark",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Logo />
          {/*menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center", width: "100%" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*navbar */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "secondary.dark",
                  display: "block",
                  fontWeight: 600,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/*Sign in */}
          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              sx={{
                py: { xs: 0.5, sm: 1 },
                px: { xs: 1, sm: 2 },
                color: "white",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                minWidth: { xs: "80px", sm: "120px" },
              }}
            >
              Sign in
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
