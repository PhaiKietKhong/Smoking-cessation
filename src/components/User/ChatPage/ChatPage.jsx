import { USER_API_ROUTES } from "@/api/apiRouter";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import usePremiumAccess from "@/hooks/usePremiumAccess";

const ChatPage = ({ chatId }) => {
  const [coach, setCoach] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasCoach, setHasCoach] = useState(true);
  const [coachLoading, setCoachLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const { isValid: isAuthenticated, isChecking } = useAuthCheck({
    requiredRole: "User",
  });
  const { hasPremiumAccess, loading: premiumLoading } = usePremiumAccess();

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(USER_API_ROUTES.GET_CHAT_HISTORY, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCoach(res.data.coach);
      setMessages(res.data.messages);
      setHasCoach(res.data.coach !== null);
    } catch (err) {
      console.error("Lỗi tải lịch sử chat:", err);
      setHasCoach(false);
    } finally {
      setLoading(false);
      setCoachLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && hasPremiumAccess && !premiumLoading && !isChecking) {
      fetchChatHistory();
    }
  }, [isAuthenticated, hasPremiumAccess, premiumLoading, isChecking, chatId]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        USER_API_ROUTES.SEND_CHAT,
        {
          content: message,
          messageType: "text",
          attachmentUrl: null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("");
      await fetchChatHistory();
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };

  if (!isAuthenticated || premiumLoading || coachLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hasPremiumAccess) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Bạn cần nâng cấp lên gói <strong>Premium</strong> để trò chuyện với
          huấn luyện viên.
        </Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/Package")}
        >
          Nâng cấp gói Premium
        </Button>
      </Container>
    );
  }

  if (!hasCoach) {
    return (
      <>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            color: "primary.light",
            gap: 2,
            bgcolor: "primary.main",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Trò chuyện</Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/userDashboard")}
            sx={{ color: "white", borderColor: "white" }}
          >
            Quay lại dashboard
          </Button>
        </Box>

        {/* Thông báo chưa có coach */}
        <Container sx={{ mt: 6 }}>
          <Alert severity="warning" sx={{ mb: 3 }}>
            Bạn chưa có huấn luyện viên. Vui lòng chọn huấn luyện viên trước khi
            bắt đầu trò chuyện.
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate("/coachlistpage")}
          >
            Chọn Huấn Luyện Viên
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          color: "primary.light",
          gap: 2,
          bgcolor: "primary.main",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Trò chuyện</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/userDashboard")}
          sx={{ color: "white", borderColor: "white" }}
        >
          Quay lại dashboard
        </Button>
      </Box>

      <Container
        sx={{ height: "88vh", display: "flex", flexDirection: "column" }}
      >
        {/* Coach Info */}
        <Box
          display="flex"
          alignItems="center"
          p={2}
          borderBottom={1}
          borderColor="divider"
        >
          <Avatar sx={{ ml: 1, mr: 2 }}>{coach?.name?.charAt(0)}</Avatar>
          <Box>
            <Typography fontWeight={600}>{coach?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Hãy cứ nhắn
            </Typography>
          </Box>
        </Box>

        {/* Messages */}
        <Box flex={1} p={2} overflow="auto">
          {messages.map((msg) => (
            <Box
              key={msg.messageId}
              display="flex"
              justifyContent={msg.isSentByMe ? "flex-end" : "flex-start"}
              mb={1.5}
            >
              <Paper
                sx={{
                  px: 2,
                  py: 1,
                  maxWidth: "70%",
                  minWidth: "150px",
                  bgcolor: msg.isSentByMe ? "primary.main" : "grey.100",
                  color: msg.isSentByMe ? "white" : "text.primary",
                }}
                elevation={2}
              >
                <Typography variant="body1" whiteSpace="pre-line">
                  {msg.content}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  align="right"
                  mt={0.5}
                >
                  {new Date(msg.sentAt).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Paper>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Divider />

        {/* Input */}
        <Box display="flex" p={2} gap={1}>
          <TextField
            fullWidth
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            multiline
            minRows={1}
            maxRows={4}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <SendIcon />
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ChatPage;
