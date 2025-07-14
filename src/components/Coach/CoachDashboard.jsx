import { COACH_API_ROUTES } from "@/api/apiRouter";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/800.css";
import ChatIcon from "@mui/icons-material/Chat";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { RiBook3Line } from "react-icons/ri";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import SendPlan from "./SendPlan/SendPlan";

function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [chatStatus, setChatStatus] = useState({});
  const [planOpen, setPlanOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const res = await axios.get(COACH_API_ROUTES.GET_MY_CLIENTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách client:", error);
    }
  };

  const fetchChats = async () => {
    try {
      const res = await axios.get(COACH_API_ROUTES.GET_CHAT_STATUS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const statusMap = {};
      res.data.forEach((item) => {
        statusMap[item.memberId] = {
          unreadCount: item.unreadCount,
          lastMessage: item.lastMessage,
        };
      });
      setChatStatus(statusMap);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chat:", error);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchChats();
  }, []);

  const handleOpenPlan = (client) => {
    setSelectedClient({
      clientId: client.clientId,
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      packageId: 2,
      coachId: 1,
      quitReason: "",
      strategies: "",
      milestones: [],
    });
    setPlanOpen(true);
  };

  const pages = [
    { title: "Trang chủ", path: "/" },
    { title: "Cộng đồng", path: "/community" },
    { title: "Gói nâng cao", path: "/Package" },
  ];

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleProfile = () => {
    handleCloseMenu();
    navigate("/coachDashboard");
  };

  const handleLogout = () => {
    handleCloseMenu();
    localStorage.clear();
    navigate("/login");
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

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "primary.light", boxShadow: "none" }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Logo />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
              }}
            >
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
                  sx={{ color: "primary.main", fontWeight: 600 }}
                  onClick={() => navigate(page.path)}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {token ? (
                <>
                  <Tooltip title={username || "Tài khoản"}>
                    <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={username}
                        src="/static/images/avatar/1.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem onClick={handleProfile}>Trang cá nhân</MenuItem>
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button onClick={() => navigate("/login")} variant="contained">
                  Đăng nhập
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Content */}
      <Container sx={{ mt: 12, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">
            Khách hàng của tôi
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/coach/appointments")}
            startIcon={<CalendarMonthOutlinedIcon />}
          >
            Xem lịch hẹn
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 2,
          }}
        >
          {clients.map((client) => {
            const chat = chatStatus[client.clientId] || {};
            return (
              <Paper
                key={client.clientId}
                elevation={3}
                sx={{
                  borderRadius: 3,
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {client.clientName?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold">
                      {client.clientName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {client.email}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap={1.5}>
                  <Badge
                    color="error"
                    badgeContent={
                      chat.unreadCount > 0 ? chat.unreadCount : null
                    }
                    invisible={chat.unreadCount === 0}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<ChatIcon />}
                      onClick={() =>
                        navigate(`/chatPageCoach/${client.clientId}`)
                      }
                    >
                      Trò chuyện
                    </Button>
                  </Badge>

                  <Button
                    variant="outlined"
                    startIcon={<RiBook3Line />}
                    onClick={() => navigate(`/clientDiary/${client.clientId}`)}
                  >
                    Xem nhật ký
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    startIcon={<EditCalendarOutlinedIcon />}
                    onClick={() => handleOpenPlan(client)}
                  >
                    Tạo kế hoạch cai
                  </Button>
                </Box>
              </Paper>
            );
          })}

          {clients.length === 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              gridColumn="1 / -1"
            >
              Không có khách hàng nào.
            </Typography>
          )}
        </Box>
      </Container>

      <SendPlan
        open={planOpen}
        onClose={() => setPlanOpen(false)}
        data={selectedClient}
        onSave={() => {
          setPlanOpen(false);
          fetchClients();
        }}
      />
    </>
  );
}

export default ClientManagement;
