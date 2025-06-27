import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";
import dayjs from "dayjs";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUserId = 1; // Giả sử user đang đăng nhập có ID là 1

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(USER_API_ROUTES.GET_MESSAGES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy tin nhắn:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        USER_API_ROUTES.SEND_MESSAGE,
        {
          content: newMessage,
          messageType: "string",
          receiverId: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessages((prev) => [
        ...prev,
        {
          messageId: Date.now(),
          senderId: currentUserId,
          senderName: "Bạn",
          receiverId: 1,
          receiverName: "Coach",
          content: newMessage,
          messageType: "string",
          sentAt: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Không gửi được tin nhắn:", error);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Trang trò chuyện</Typography>
      </Box>

      {/* Chat Messages */}
      <Container
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.map((msg) => {
          const isOwn = msg.senderId === currentUserId;
          const isBooking = msg.messageType === "SESSION_BOOKING";

          return (
            <Box
              key={msg.messageId}
              sx={{
                alignSelf: isOwn ? "flex-end" : "flex-start",
                maxWidth: "70%",
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  bgcolor: isBooking ? "#e0f7fa" : isOwn ? "#c8e6c9" : "#fff",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {isBooking ? "[Đặt lịch]" : ""}
                  {msg.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  {dayjs(msg.sentAt).format("HH:mm DD/MM/YYYY")}
                </Typography>
              </Paper>
            </Box>
          );
        })}
      </Container>

      {/* Input Box */}
      <Box
        sx={{
          display: "flex",
          p: 2,
          borderTop: "1px solid #ccc",
        }}
      >
        <TextField
          fullWidth
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          variant="contained"
          sx={{ ml: 1 }}
          onClick={handleSend}
          endIcon={<SendIcon />}
        >
          Gửi
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
