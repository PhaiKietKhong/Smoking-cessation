import { COACH_API_ROUTES } from "@/api/apiRouter";
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
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ChatPageCoach = ({ chatId, onBack }) => {
  const [coach, setCoach] = useState(null);
  const { clientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${COACH_API_ROUTES.GET_CHAT_MEMBER}/${clientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClient(res.data.client);
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Lỗi tải lịch sử chat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [chatId]);

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

      setMessage(""); // clear input
      await fetchChatHistory(); // reload tin nhắn từ API
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Header  */}
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
        <Typography variant="h4">Tạo Cuộc Hẹn</Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/userDashboard")}
            sx={{ color: "white", borderColor: "white" }}
          >
            Quay lại dashboard
          </Button>
        </Box>
      </Box>
      <Container
        sx={{ height: "88vh", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          p={2}
          borderBottom={1}
          borderColor="divider"
        >
          <Avatar sx={{ ml: 1, mr: 2 }}>{coach.name?.charAt(0)}</Avatar>
          <Box>
            <Typography fontWeight={600}>{coach.name}</Typography>
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

export default ChatPageCoach;
