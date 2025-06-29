import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import Chart from "./Chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";

function Progress() {
  const [planData, setPlanData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fecthPlanData = async () => {
      try {
        const res = await axios.get(USER_API_ROUTES.GET_SUGGEST_PLAN, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPlanData(res.data);
      } catch (error) {}
    };
    fecthPlanData();
  }, []);

  if (!planData) {
    return (
      <Box sx={{ my: 5, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Bạn không có kế hoạch cai thuốc.
        </Typography>
      </Box>
    );
  }

  const progressText = `${planData.daysCompleted}/${planData.daysInPlan} ngày (${planData.completionPercentage}%)`;
  const daysLeft = planData.daysInPlan - planData.daysCompleted;

  return (
    <Box sx={{ color: "primary.light", my: 3 }}>
      <Grid container spacing={2} sx={{ height: "50vh" }}>
        {/* Thông tin tổng quan kế hoạch */}
        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardHeader
              title={
                <Typography variant="h6" fontWeight="bold">
                  {planData.name}
                </Typography>
              }
              subheader={planData.reasonForSuggestion}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ccc",
                  borderRadius: 4,
                },
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {planData.description}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Ngày bắt đầu:
                  </Typography>
                  <Typography fontWeight={500}>
                    {new Date(planData.startDate).toLocaleDateString("vi-VN")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Ngày kết thúc:
                  </Typography>
                  <Typography fontWeight={500}>
                    {new Date(planData.endDate).toLocaleDateString("vi-VN")}
                  </Typography>
                </Grid>
              </Grid>

              {/* Chiến lược */}
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ color: "primary.main" }}
                >
                  Chiến lược hỗ trợ:
                </Typography>
                <ul style={{ marginTop: 4 }}>
                  {planData.strategies?.map((strategy, index) => (
                    <li key={index}>
                      <Typography variant="body2">- {strategy}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Mốc tuần (milestones) */}
        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" fontWeight="bold">
                  Các mốc trong kế hoạch
                </Typography>
              }
              subheader="Chi tiết từng tuần"
            />
            <CardContent
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ccc",
                  borderRadius: 4,
                },
              }}
            >
              {planData.milestones?.map((milestone, idx) => (
                <Box key={idx} mb={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary"
                  >
                    {milestone.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {milestone.description}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    🎯 Mục tiêu: {milestone.targetCigarettes} điếu/ngày
                  </Typography>
                  <Typography variant="body2">
                    📅 Thời hạn:{" "}
                    {new Date(milestone.targetDate).toLocaleDateString("vi-VN")}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" mt={1}>
                    ✅ Hành động:
                  </Typography>
                  <ul style={{ paddingLeft: 16 }}>
                    {milestone.actions?.map((action, i) => (
                      <li key={i}>
                        <Typography variant="body2">
                          {i + 1}. {action}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Box
        sx={{
          my: 4,
          p: 2,
          color: "primary.light",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography sx={{ color: "black", mb: 1 }} variant="h4">
          Biểu Đồ thuốc lá tránh được
        </Typography>
        <Typography sx={{ color: "secondary.dark" }} variant="body2">
          2 tuần gần nhất
        </Typography>
        <Chart />
      </Box>
    </Box>
  );
}

export default Progress;
