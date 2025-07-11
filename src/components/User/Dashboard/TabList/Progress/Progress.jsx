import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import Chart from "./Chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import EditPlanModal from "./EditPlanModal/EditPlanModal";
import React from "react";
import { Flag, AccessTime, DirectionsRun } from "@mui/icons-material";
function Progress() {
  const [planData, setPlanData] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const token = localStorage.getItem("token");

  const fetchMyPlanOrSuggest = async () => {
    try {
      const res = await axios.get(USER_API_ROUTES.GET_MY_PLAN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data && res.data.length > 0) {
        const data = res.data[0];
        data.strategies =
          typeof data.strategies === "string"
            ? data.strategies.split(",").map((s) => s.trim())
            : data.strategies;
        setPlanData(data);
      } else {
        const suggestRes = await axios.get(USER_API_ROUTES.GET_SUGGEST_PLAN, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPlanData(suggestRes.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy kế hoạch:", error);
      try {
        const suggestRes = await axios.get(USER_API_ROUTES.GET_SUGGEST_PLAN, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPlanData(suggestRes.data);
      } catch (e) {
        console.error("Lỗi khi lấy kế hoạch gợi ý:", e);
      }
    }
  };
  useEffect(() => {
    fetchMyPlanOrSuggest();
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

  const handleEdit = () => {
    setMilestones(planData.milestones || []);
    setEditOpen(true);
  };

  const progressText = `${planData.daysCompleted}/${planData.daysInPlan} ngày (${planData.completionPercentage}%)`;
  const daysLeft = planData.daysInPlan - planData.daysCompleted;

  return (
    <Box
      sx={{
        color: "primary.light",
        my: 3,
      }}
    >
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
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
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
            {/* <Box sx={{ px: 3, pt: 2 }}>
              {planData.status === "Đạt yêu cầu" && (
                <Chip
                  label="Đạt yêu cầu"
                  color="success"
                  icon={<span style={{ fontWeight: "bold" }}>✔️</span>}
                  sx={{ fontWeight: "bold", fontSize: 16 }}
                />
              )}
              {planData.status === "Không đạt yêu cầu" && (
                <Chip
                  label="Không đạt yêu cầu"
                  color="error"
                  icon={<span style={{ fontWeight: "bold" }}>❌</span>}
                  sx={{ fontWeight: "bold", fontSize: 16 }}
                />
              )}
            </Box> */}
            <CardHeader
              title={
                <Typography variant="h6" fontWeight="bold">
                  Các mốc trong kế hoạch
                </Typography>
              }
              subheader="Chi tiết từng tuần"
              action={
                <Tooltip title="chỉnh sửa">
                  <IconButton aria-label="edit" onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              }
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

                  <Typography
                    variant="body2"
                    mt={1}
                    display="flex"
                    alignItems="center"
                  >
                    <Flag
                      fontSize="small"
                      sx={{ mr: 0.5, color: "warning.main" }}
                    />
                    Mục tiêu: {milestone.targetCigarettes} điếu/ngày
                  </Typography>

                  <Typography
                    variant="body2"
                    display="flex"
                    alignItems="center"
                  >
                    <AccessTime
                      fontSize="small"
                      sx={{ mr: 0.5, color: "info.main" }}
                    />
                    Thời hạn:{" "}
                    {new Date(milestone.targetDate).toLocaleDateString("vi-VN")}
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    mt={1}
                    display="flex"
                    alignItems="center"
                  >
                    <DirectionsRun
                      fontSize="small"
                      sx={{ mr: 0.5, color: "success.main" }}
                    />
                    Hành động:
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
      <EditPlanModal
        open={editOpen}
        onClose={(shouldReload) => {
          setEditOpen(false);
          if (shouldReload) {
            fetchMyPlanOrSuggest();
          }
        }}
        initialData={milestones}
      />
    </Box>
  );
}

export default Progress;
