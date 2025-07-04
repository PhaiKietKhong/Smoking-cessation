import { COACH_API_ROUTES } from "@/api/apiRouter";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/800.css";
import ChatIcon from "@mui/icons-material/Chat";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import MenuIcon from "@mui/icons-material/Menu";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import SendPlan from "./SendPlan/SendPlan";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [chatStatus, setChatStatus] = useState({});
  const [planOpen, setPlanOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const token = localStorage.getItem("token");

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
    console.log(client.coachId);
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
    { title: "Blog", path: "/" },
    { title: "Gói nâng cao", path: "/Package" },
  ];

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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
    navigate("/coachDashboard");
  };

  const handleLogout = () => {
    handleCloseMenu();
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <>
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

      <Container sx={{ mt: 10 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Tên</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Trò chuyện</b>
                </TableCell>
                <TableCell>
                  <b>Tạo kế hoạch cai thuốc</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => {
                const chat = chatStatus[client.clientId] || {};
                return (
                  <TableRow key={client.clientId}>
                    <TableCell>{client.clientName}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>
                      <Badge
                        color="error"
                        badgeContent={
                          chat.unreadCount > 0 ? chat.unreadCount : 0
                        }
                        invisible={chat.unreadCount === 0}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<ChatIcon />}
                          onClick={() =>
                            navigate(`/chatPageCoach/${client.clientId}`)
                          }
                        >
                          Trò chuyện
                        </Button>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<EditCalendarOutlinedIcon />}
                        onClick={() => handleOpenPlan(client)}
                      >
                        Tạo kế hoạch
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

              {clients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography align="center" color="text.secondary">
                      Không có khách hàng nào.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Modal tạo kế hoạch */}
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
