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
import DashboardLayout from "./Layout/DashboardLayout";

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
  const [dateRange, setDateRange] = useState("");

  // Sample data for user growth
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [65, 89, 120, 150, 180, 210],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.1)",
      },
    ],
  };

  // Sample data for post views
  const postViewsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Post Views",
        data: [1200, 1900, 1500, 2100, 1800, 2400, 2000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderRadius: 5,
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
      <Box sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h4" gutterBottom>
            System Dashboard
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              select
              size="small"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </TextField>
            <TextField
              type="date"
              size="small"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              sx={{ minWidth: 150 }}
            />
            <Tooltip title="Apply Filters">
              <IconButton>
                <FilterList />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh Data">
              <IconButton>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* First Line - System Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Posts"
              value="1,234"
              icon={<ArticleIcon sx={{ color: "#4CAF50" }} />}
              color="#4CAF50"
              change={12}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="New Posts"
              value="45"
              icon={<ArticleIcon sx={{ color: "#2196F3" }} />}
              color="#2196F3"
              change={8}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Users"
              value="5,678"
              icon={<PeopleIcon sx={{ color: "#FF9800" }} />}
              color="#FF9800"
              change={15}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="New Registrations"
              value="123"
              icon={<PersonAddIcon sx={{ color: "#F44336" }} />}
              color="#F44336"
              change={20}
            />
          </Grid>
        </Grid>

        {/* Second Line - User Growth and Engagement */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
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
                        position: "top",
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                User Engagement
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut
                  data={userEngagementData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Third Line - Post Views and Additional Stats */}
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Post Views Analytics
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={postViewsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <Grid container spacing={3}>
              <Grid item size={{ xs: 12 }}>
                <StatCard
                  title="Active Users"
                  value="2,345"
                  icon={<PeopleIcon sx={{ color: "#9C27B0" }} />}
                  color="#9C27B0"
                  change={5}
                />
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <StatCard
                  title="Total Views"
                  value="45,678"
                  icon={<VisibilityIcon sx={{ color: "#00BCD4" }} />}
                  color="#00BCD4"
                  change={18}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
