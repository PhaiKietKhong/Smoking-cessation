import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/800.css";
import { jwtDecode } from "jwt-decode";

function Header() {
  const pages = [
    { title: "Trang chủ", path: "/" },
    { title: "Cộng đồng", path: "/community" },
    { title: "Blog", path: "/" },
    { title: "Gói nâng cao", path: "/Package" },
  ];

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        {pages.map((page) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton onClick={() => navigate(page.path)}>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleCloseMenu();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (role === "Admin") {
        navigate("/AdminDashboard");
      } else if (role === "User") {
        navigate("/userDashboard");
      } else if (role === "Coach") {
        navigate("/coachDashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
      navigate("/login");
    }
  };
  const handleLogout = () => {
    handleCloseMenu();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "primary.light", boxShadow: "none" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Logo />

          {/* Menu icon mobile */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </Box>
          </Box>

          {/* Navbar desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                sx={{
                  color: "primary.main",
                  display: "block",
                  fontWeight: 600,
                }}
                onClick={() => navigate(page.path)}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Avatar hoặc Đăng nhập */}
          <Box sx={{ flexGrow: 0 }}>
            {token ? (
              <>
                <Tooltip title={username || "Tài khoản"}>
                  <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                    <Avatar alt={username} src="/static/images/avatar/1.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleProfile}>Trang cá nhân</MenuItem>
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              </>
            ) : (
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
                Đăng nhập
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
