import { COACH_API_ROUTES } from "@/api/apiRouter";
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const ChatPageCoach = () => {
  const { clientId } = useParams();
  const [clientName, setClientName] = useState("Coach");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Role-based authentication
  const { isValid, isChecking } = useAuthCheck({ requiredRole: "Coach" });

  const fetchClientName = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(COACH_API_ROUTES.GET_MY_CLIENTS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const matchedClient = res.data.find(
        (client) => client.clientId === parseInt(clientId)
      );

      if (matchedClient) {
        setClientName(matchedClient.clientName);
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách client:", err);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${COACH_API_ROUTES.GET_CHAT_MEMBER}/${clientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(res.data || []);
    } catch (err) {
      console.error("Lỗi tải lịch sử chat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientName();
    fetchChatHistory();
  }, [clientId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${COACH_API_ROUTES.SEND_CHAT}/${clientId}/reply`,
        {
          content: message,
          messageType: "string",
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

  if (isChecking || loading || !isValid) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
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
        <Typography variant="h4">Trò chuyện với khách hàng</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/coachDashboard")}
          sx={{ color: "white", borderColor: "white" }}
        >
          Quay lại dashboard
        </Button>
      </Box>

      <Container
        sx={{ height: "88vh", display: "flex", flexDirection: "column" }}
      >
        {/* Client Info */}
        <Box
          display="flex"
          alignItems="center"
          p={2}
          borderBottom={1}
          borderColor="divider"
        >
          <Avatar sx={{ ml: 1, mr: 2 }}>{clientName.charAt(0)}</Avatar>
          <Box>
            <Typography fontWeight={600}>{clientName || "Coach"}</Typography>
            <Typography variant="body2" color="text.secondary">
              Đang trò chuyện
            </Typography>
          </Box>
        </Box>

        {/* Messages */}
        <Box flex={1} p={2} overflow="auto">
          {messages.map((msg) => {
            const isSentByCoach = msg.isSentByCoach;
            const isBooking = msg.messageType === "SESSION_BOOKING";

            return (
              <Box
                key={msg.messageId}
                display="flex"
                justifyContent={isSentByCoach ? "flex-end" : "flex-start"}
                mb={1.5}
              >
                <Paper
                  sx={{
                    px: 2,
                    py: 1,
                    maxWidth: "70%",
                    minWidth: "150px",
                    bgcolor: isSentByCoach ? "primary.main" : "grey.100",
                    color: isSentByCoach ? "white" : "text.primary",
                    borderLeft: isBooking ? "4px solid #f50057" : undefined,
                  }}
                  elevation={2}
                >
                  <Typography variant="body1" whiteSpace="pre-line">
                    {isBooking ? <strong>Lịch hẹn:</strong> : null}{" "}
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
            );
          })}
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

export default ChatPageCoach;
