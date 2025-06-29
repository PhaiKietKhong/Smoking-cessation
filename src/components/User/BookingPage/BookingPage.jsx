import {
  ReportProblem as AlertIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CardCoaching from "./CardCoaching/CardCoaching";

export default function BookingPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const coaches = [
    {
      id: 1,
      name: "Dr. Nguyễn Minh Hạnh",
      title: "Bác sĩ Tâm lý",
      specialization: "Tâm lý cai nghiện",
      avatar: "/placeholder.svg",
      status: "online",
      rating: 4.8,
      reviews: 124,
      bio: "Hơn 10 năm kinh nghiệm trong tư vấn và hỗ trợ tâm lý cho thanh thiếu niên.",
      achievements: ["Tốt nghiệp Harvard", "Tác giả sách bán chạy"],
      experience: "10 năm",
      price: "500.000đ / buổi",
      languages: ["Tiếng Việt", "English"],
      nextAvailable: "Thứ 5, 15/06",
    },
    {
      id: 2,
      name: "Dr. Nguyễn Minh Hạnh",
      title: "Bác sĩ Tâm lý",
      specialization: "Tâm lý cai nghiện",
      avatar: "/placeholder.svg",
      status: "online",
      rating: 4.8,
      reviews: 124,
      bio: "Hơn 10 năm kinh nghiệm trong tư vấn và hỗ trợ tâm lý cho thanh thiếu niên.",
      achievements: ["Tốt nghiệp Harvard", "Tác giả sách bán chạy"],
      experience: "10 năm",
      price: "500.000đ / buổi",
      languages: ["Tiếng Việt", "English"],
      nextAvailable: "Thứ 5, 15/06",
    },
    {
      id: 3,
      name: "Dr. Nguyễn Minh Hạnh",
      title: "Bác sĩ Tâm lý",
      specialization: "Tâm lý cai nghiện",
      avatar: "/placeholder.svg",
      status: "online",
      rating: 4.8,
      reviews: 124,
      bio: "Hơn 10 năm kinh nghiệm trong tư vấn và hỗ trợ tâm lý cho thanh thiếu niên.",
      achievements: ["Tốt nghiệp Harvard", "Tác giả sách bán chạy"],
      experience: "10 năm",
      price: "500.000đ / buổi",
      languages: ["Tiếng Việt", "English"],
      nextAvailable: "Thứ 5, 15/06",
    },
    {
      id: 4,
      name: "Dr. Nguyễn Minh Hạnh",
      title: "Bác sĩ Tâm lý",
      specialization: "Tâm lý cai nghiện",
      avatar: "/placeholder.svg",
      status: "online",
      rating: 4.8,
      reviews: 124,
      bio: "Hơn 10 năm kinh nghiệm trong tư vấn và hỗ trợ tâm lý cho thanh thiếu niên.",
      achievements: ["Tốt nghiệp Harvard", "Tác giả sách bán chạy"],
      experience: "10 năm",
      price: "500.000đ / buổi",
      languages: ["Tiếng Việt", "English"],
      nextAvailable: "Thứ 5, 15/06",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "green";
      case "busy":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Box
        component="header"
        sx={{
          backgroundColor: "white",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container sx={{ py: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Tư vấn chuyên gia
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nhận hỗ trợ từ các huấn luyện viên chuyên nghiệp
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<AlertIcon />}
                href="/coaching/emergency"
              >
                Hỗ trợ khẩn cấp
              </Button>
              <Button
                variant="contained"
                href="/coaching/chat"
                startIcon={<MessageIcon />}
              >
                Tin nhắn
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Chuyên gia" />
          <Tab label="Lịch hẹn" />
          <Tab label="Tin nhắn" />
          <Tab label="Nhóm tư vấn" />
        </Tabs>

        {selectedTab === 0 && (
          <Grid container spacing={2} mt={2}>
            {coaches.map((coach) => (
              <Grid size={{ xs: 12, md: 6 }} key={coach.id}>
                <CardCoaching
                  id={coach.id}
                  name={coach.name}
                  title={coach.title}
                  specialization={coach.specialization}
                  reviews={coach.reviews}
                  rating={coach.rating}
                  status={coach.status}
                  avatar={coach.avatar}
                  bio={coach.bio}
                  achievements={coach.achievements}
                  experience={coach.experience}
                  price={coach.price}
                  languages={coach.languages}
                  nextAvailable={coach.nextAvailable}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* You would similarly render tabs for sessions, chats, group here */}
      </Container>
    </Box>
  );
}
