import {
  Box,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { EmojiEvents } from "@mui/icons-material";
import Header from "../LandingPage/Header";
import PostInputBox from "./PostInputBox/PostInputBox";
import AllPostsTab from "./Tabs/AllPostsTab";
import PopularPostsTab from "./Tabs/PopularPostsTab";
import ExperiencePostsTab from "./Tabs/ExperiencePostsTab";
import MyPostsTab from "./Tabs/MyPostsTab";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [reloadTrigger, setReloadTrigger] = useState(0); // Trigger reload for children

  const leaderboard = [
    { accountName: "k123", moneySaved: 159497 },
    { accountName: "k1234", moneySaved: 9 },
  ]
    .sort((a, b) => b.moneySaved - a.moneySaved)
    .slice(0, 10);

  const handlePostSubmit = () => {
    setReloadTrigger((prev) => prev + 1);
    setActiveTab(0);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", p: 4 }}>
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "2fr 1fr" },
          gap: 4,
          maxWidth: "1200px",
          mx: "auto",
          my: 4,
          alignItems: "start",
        }}
      >
        <Box>
          <PostInputBox onSubmit={handlePostSubmit} />

          <Tabs
            value={activeTab}
            onChange={(e, newVal) => setActiveTab(newVal)}
            sx={{ mt: 2 }}
          >
            <Tab label="Bài Đăng" />
            <Tab label="Phổ Biến" />
            <Tab label="Kiến Thức" />
            <Tab label="Bài viết của tôi" />
          </Tabs>

          {activeTab === 0 && <AllPostsTab reload={reloadTrigger} />}
          {activeTab === 1 && <PopularPostsTab reload={reloadTrigger} />}
          {activeTab === 2 && <ExperiencePostsTab reload={reloadTrigger} />}
          {activeTab === 3 && <MyPostsTab reload={reloadTrigger} />}
        </Box>

        <Box sx={{ position: "sticky", top: 88, alignSelf: "start" }}>
          <Paper
            elevation={4}
            sx={{ borderLeft: "6px solid #facc15", p: 2, boxShadow: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmojiEvents sx={{ color: "#facc15", mr: 1 }} />
              <Typography variant="h6" color="text.primary">
                Bảng xếp hạng tiết kiệm tiền
              </Typography>
            </Box>
            <List>
              {leaderboard.map((user, index) => (
                <ListItem key={index} divider>
                  <ListItemAvatar>
                    <Avatar>{user.accountName.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      color:
                        index === 0
                          ? "red"
                          : index === 1
                          ? "#d8c70e"
                          : index === 2
                          ? "primary.main"
                          : "",
                    }}
                    primary={`#${index + 1} - ${user.accountName}`}
                    secondary={user.moneySaved.toLocaleString() + "đ"}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
