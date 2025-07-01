import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import PermPhoneMsgRoundedIcon from "@mui/icons-material/PermPhoneMsgRounded";
import { useNavigate } from "react-router-dom";
import SportsIcon from "@mui/icons-material/Sports";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import usePremiumAccess from "@/Hooks/usePremiumAccess";
import SwitchAccessShortcutAddOutlinedIcon from "@mui/icons-material/SwitchAccessShortcutAddOutlined";
export default function PrimarySearchAppBar({ userData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { hasPremiumAccess, loading } = usePremiumAccess();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("username");
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    navigate("/login");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleFormerData = () => {
    navigate("/formersmokedata");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleFormerData}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <CheckCircleOutlineIcon />
          <Typography variant="body1">Former smoker data</Typography>
        </Box>
      </MenuItem>

      <MenuItem onClick={logout}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <LogoutIcon />
          <Typography variant="body1">Logout</Typography>
        </Box>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <UpgradeIcon />
        </IconButton>
        <p>update progress</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle sx={{ color: "primary.light" }} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {renderMobileMenu}
      {renderMenu}
      <AppBar
        position="static"
        sx={{ bgcolor: "primary.main", p: 1, boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "primary.light",
            }}
          >
            Chào mừng
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!loading && hasPremiumAccess ? (
              <>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{
                    color: "primary.light",
                    mr: 2,
                    borderColor: "primary.light",
                  }}
                  startIcon={<ChatBubbleOutlineRoundedIcon />}
                  onClick={() => navigate("/chatPage")}
                >
                  Trò chuyện với huấn luyện viên
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{
                    color: "primary.light",
                    mr: 2,
                    borderColor: "primary.light",
                  }}
                  startIcon={<SportsIcon />}
                  onClick={() => navigate("/coachlistpage")}
                >
                  Chọn huấn luyện viên
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{
                    color: "primary.light",
                    mr: 2,
                    borderColor: "primary.light",
                  }}
                  startIcon={<PermPhoneMsgRoundedIcon />}
                  onClick={() => navigate("/createAppointment")}
                >
                  Tạo cuộc hẹn
                </Button>
              </>
            ) : (
              !loading && (
                <Button
                  size="large"
                  aria-label="show 17 new notifications"
                  variant="outlined"
                  sx={{
                    color: "primary.light",
                    mr: 2,
                    borderColor: "primary.light",
                  }}
                  startIcon={<SwitchAccessShortcutAddOutlinedIcon />}
                  onClick={() => navigate("/Package")}
                >
                  Nâng cấp gói Premium
                </Button>
              )
            )}
            <Button
              size="large"
              aria-label="show 17 new notifications"
              variant="outlined"
              sx={{
                color: "primary.light",
                mr: 2,
                borderColor: "primary.light",
              }}
              startIcon={<ImportContactsRoundedIcon />}
              onClick={() => navigate("/diarylist")}
            >
              Nhật ký
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: "primary.light" }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              sx={{ color: "primary.light" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Update mobile menu icons color */}
      <Menu
        // ...existing menu props...
        PaperProps={{
          sx: {
            "& .MuiIconButton-root": {
              color: "primary.light",
            },
            "& .MuiTypography-root": {
              color: "primary.light",
            },
          },
        }}
      >
        {renderMobileMenu}
      </Menu>
      {renderMenu}
    </Box>
  );
}
