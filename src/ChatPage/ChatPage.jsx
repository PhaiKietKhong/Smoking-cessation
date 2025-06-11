"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  AttachFile,
  InsertEmoticon,
  MoreVert,
  Phone,
  Send,
  Videocam,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ChatPage({ params }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "coach",
      content:
        "Chào bạn! Tôi là Dr. Nguyễn Minh Hạnh. Rất vui được hỗ trợ bạn trong hành trình cai thuốc. Bạn đang gặp khó khăn gì?",
      timestamp: "14:30",
      type: "text",
    },
    {
      id: 2,
      sender: "user",
      content:
        "Chào bác sĩ! Em đang ở ngày thứ 47 không hút thuốc, nhưng hôm nay em thấy rất thèm thuốc, đặc biệt là sau bữa trưa.",
      timestamp: "14:32",
      type: "text",
    },
    {
      id: 3,
      sender: "coach",
      content:
        "Tuyệt vời! 47 ngày là một thành tích rất đáng tự hào. Cảm giác thèm thuốc sau bữa ăn là hoàn toàn bình thường. Bạn có thể thử một số cách sau:",
      timestamp: "14:33",
      type: "text",
    },
    {
      id: 4,
      sender: "coach",
      content:
        "1. Đánh răng ngay sau khi ăn\n2. Nhai kẹo cao su không đường\n3. Uống một cốc nước lạnh\n4. Đi bộ nhẹ 5-10 phút",
      timestamp: "14:33",
      type: "tips",
    },
    {
      id: 5,
      sender: "user",
      content:
        "Cảm ơn bác sĩ! Em sẽ thử những cách này. Còn về việc tăng cân thì sao ạ? Em thấy tăng khoảng 3kg từ khi cai thuốc.",
      timestamp: "14:35",
      type: "text",
    },
    {
      id: 6,
      sender: "coach",
      content:
        "Tăng cân nhẹ trong giai đoạn đầu cai thuốc là bình thường do chuyển hóa thay đổi. Tôi sẽ kết nối bạn với chuyên gia dinh dưỡng để có kế hoạch ăn uống phù hợp nhé.",
      timestamp: "14:37",
      type: "text",
    },
  ]);

  const messagesEndRef = useRef(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const coach = {
    name: "Dr. Nguyễn Minh Hạnh",
    avatar: "/placeholder.svg",
    lastSeen: "Đang hoạt động",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      setTimeout(() => {
        const coachResponse = {
          id: messages.length + 2,
          sender: "coach",
          content:
            "Cảm ơn bạn đã chia sẻ. Tôi đang xem xét và sẽ trả lời chi tiết trong giây lát...",
          timestamp: new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "text",
        };
        setMessages((prev) => [...prev, coachResponse]);
      }, 1000);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" bgcolor="#f9fafb">
      <Box
        bgcolor="#fff"
        borderBottom={1}
        borderColor="#e0e0e0"
        px={2}
        py={1.5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Link href="/coaching">
            <IconButton size="small">
              <ArrowBack fontSize="small" />
            </IconButton>
          </Link>
          <Avatar alt={coach.name} src={coach.avatar} />
          <Box>
            <Typography variant="subtitle1">{coach.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              {coach.lastSeen}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton>
            <Phone fontSize="small" />
          </IconButton>
          <IconButton>
            <Videocam fontSize="small" />
          </IconButton>
          <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
            <MoreVert fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => setMenuAnchor(null)}>Xem hồ sơ</MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)}>
              Đặt lịch hẹn
            </MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)}>Báo cáo</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box flex={1} overflow="auto" px={2} py={2}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            display="flex"
            justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
            mb={2}
          >
            <Box
              display="flex"
              gap={1}
              maxWidth="70%"
              flexDirection={msg.sender === "user" ? "row-reverse" : "row"}
            >
              {msg.sender === "coach" && (
                <Avatar
                  alt={coach.name}
                  src={coach.avatar}
                  sx={{ width: 32, height: 32 }}
                />
              )}
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor:
                      msg.sender === "user"
                        ? "primary.main"
                        : msg.type === "tips"
                        ? "#ecfdf5"
                        : "#fff",
                    color: msg.sender === "user" ? "#fff" : "inherit",
                    border:
                      msg.type === "tips"
                        ? "1px solid #d1fae5"
                        : "1px solid #e0e0e0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.type === "tips" ? (
                    <Box>
                      <Typography variant="body2" mt={1}>
                        {msg.content}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2">{msg.content}</Typography>
                  )}
                </Paper>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  align={msg.sender === "user" ? "right" : "left"}
                >
                  {msg.timestamp}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box px={2} py={1} borderTop={1} borderColor="#e0e0e0" bgcolor="#fff">
        <Stack direction="row" spacing={1} overflow="auto">
          {["Thèm thuốc", "Cảm ơn", "Cần hỗ trợ"].map((text) => (
            <Button
              key={text}
              variant="outlined"
              size="small"
              onClick={() => setMessage(text)}
            >
              {text}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box px={2} py={1} borderTop={1} borderColor="#e0e0e0" bgcolor="#fff">
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <IconButton>
            <AttachFile fontSize="small" />
          </IconButton>
          <InputBase
            fullWidth
            placeholder="Nhập tin nhắn..."
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            sx={{ minHeight: 40, px: 1 }}
          />
          <IconButton>
            <InsertEmoticon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
