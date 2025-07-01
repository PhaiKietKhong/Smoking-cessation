import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header/Hearder";
import QuickStat from "./QuickStat.jsx/QuickStat";
import TabList from "./TabList/TabList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";
import { useAuthCheck } from "@/Hooks/useAuthCheck";

function UserDashBoard() {
  const navigate = useNavigate();
  const isValid = useAuthCheck({ requiredRole: "User" });

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userData, setUserData] = useState();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (checkingAuth) return;

    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [statusResponse, achievementResponse] = await Promise.all([
          axios(USER_API_ROUTES.GET_SMOKING_STATUS, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          axios(USER_API_ROUTES.GET_ACHIEVEMENTS, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        setUserData(statusResponse.data);
        setAchievements(achievementResponse.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [checkingAuth]);

  if (!isValid) return null;

  return (
    <Box>
      {/* Header */}
      <Header userData={userData} />

      <Box sx={{ px: { xs: 2, md: 6 } }}>
        <QuickStat userData={userData} />
        <TabList achievements={achievements} />
      </Box>
    </Box>
  );
}

export default UserDashBoard;
