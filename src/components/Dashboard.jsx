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
  TrendingUp,
  AttachMoney,
  SmokeFree,
  Favorite,
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

  // Sample data for smoking progress
  const smokingProgressData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Cigarettes per day",
        data: [20, 15, 10, 5],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.1)",
      },
    ],
  };

  // Sample data for money saved
  const moneySavedData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Money Saved (VND)",
        data: [140000, 280000, 420000, 560000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderRadius: 5,
      },
    ],
  };

  // Sample data for health improvement
  const healthImprovementData = {
    labels: [
      "Blood Pressure",
      "Lung Function",
      "Energy Level",
      "Sleep Quality",
    ],
    datasets: [
      {
        data: [30, 40, 60, 50],
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

  const StatCard = ({ title, value, icon, color }) => (
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
            Dashboard
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

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Days Smoke-Free"
              value="28"
              icon={<TrendingUp sx={{ color: "#4CAF50" }} />}
              color="#4CAF50"
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Money Saved"
              value="560,000₫"
              icon={<AttachMoney sx={{ color: "#2196F3" }} />}
              color="#2196F3"
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Cigarettes Not Smoked"
              value="560"
              icon={<SmokeFree sx={{ color: "#FF9800" }} />}
              color="#FF9800"
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Health Score"
              value="85%"
              icon={<Favorite sx={{ color: "#F44336" }} />}
              color="#F44336"
            />
          </Grid>
        </Grid>

        {/* Second Line - Progress and Health Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item size={{ xs: 12, sm: 6, md: 8 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Smoking Progress
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={smokingProgressData}
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
          <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Health Improvement
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut
                  data={healthImprovementData}
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

        {/* Third Line - Money Saved Chart */}
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, sm: 6, md: 12 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Money Saved Over Time
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={moneySavedData}
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
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
