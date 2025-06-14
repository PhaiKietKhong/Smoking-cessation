import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  TextField,
  MenuItem,
  Stack,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Article as ArticleIcon,
  PersonAdd as PersonAddIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Forum as ForumIcon,
  FilterList,
  Refresh,
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import DashboardLayout from "./DashboardLayout";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [dateRange, setDateRange] = useState("");// Sample data for user growth
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "New Users",
        data: [280, 350, 420, 720, 680, 540, 860, 580, 640, 780, 920, 980],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#3b82f6",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Sample data for post views (bar chart)
  const postViewsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Report Views",
        data: [260, 340, 220, 300, 380, 260, 220, 300, 340, 220, 380, 260],
        backgroundColor: "#10b981",
        borderRadius: 4,
        barThickness: 22,
      },
    ],
  };

  // Sample data for user engagement
  const userEngagementData = {
    labels: ["Posts", "Comments", "Shares", "Likes"],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const StatCard = ({ title, value, icon, color, change }) => (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            {change && (
              <Typography
                variant="body2"
                color={change > 0 ? "success.main" : "error.main"}
              >
                {change > 0 ? "+" : ""}
                {change}% from last period
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: "50%",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1  }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
        </Stack>

        {/* Date Filter Section */}        <Box sx={{ mb: 3, p: 3, backgroundColor: "white", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Data Filter
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1">From Date:</Typography>
            <TextField
              type="date"
              size="small"
              placeholder="Select start date"
              sx={{ minWidth: 200 }}
            />
            <Typography variant="body1">To Date:</Typography>
            <TextField
              type="date"
              size="small"
              placeholder="Select end date"
              sx={{ minWidth: 200 }}
            />
            <button 
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Filter Data
            </button>
            <button 
              style={{
                backgroundColor: "#6b7280",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Reset
            </button>
          </Stack>
        </Box>

        {/* First Line - System Stats */}        <Grid container spacing={3} sx={{ mb: 3 }}>          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>            <StatCard
              title="Total Posts"
              value="4,125"
              icon={<ArticleIcon sx={{ color: "#3b82f6" }} />}
              color="#3b82f6"
              change={15}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="New Posts"
              value="387"
              icon={<TrendingUpIcon sx={{ color: "#10b981" }} />}
              color="#10b981"
              change={12}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="New Registrations"
              value="156"
              icon={<PersonAddIcon sx={{ color: "#f59e0b" }} />}
              color="#f59e0b"
              change={18}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Active Users"
              value="2,834"
              icon={<PeopleIcon sx={{ color: "#ef4444" }} />}
              color="#ef4444"
              change={25}
            />
          </Grid>
        </Grid>

        {/* Second Line - User Growth and Engagement */}        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, height: "100%" }}>              <Typography variant="h6" gutterBottom>
                User Growth
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={userGrowthData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 1000,
                        ticks: {
                          stepSize: 250,
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, height: "100%" }}>              <Typography variant="h6" gutterBottom>
                Report Views
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={postViewsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 360,
                        ticks: {
                          stepSize: 90,
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>        {/* Remove the third line section completely */}
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
