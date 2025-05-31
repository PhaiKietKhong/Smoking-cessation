import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";

function Header() {
  const pages = ["Community", "Blog", "Preminum"];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        {pages.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
            {/* Remove onClick from Box and add it to IconButton */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={toggleDrawer(true)} // Move onClick here
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top" // Add anchor position
                open={open}
                onClose={toggleDrawer(false)}
              >
                {DrawerList}
              </Drawer>
            </Box>
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
