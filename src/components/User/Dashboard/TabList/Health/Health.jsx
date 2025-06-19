import { USER_API_ROUTES } from "@/api/apiRouter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Health() {
  const [healthData, setHealthData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const res = await axios.get(USER_API_ROUTES.GET_BRINKMAN, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setHealthData(res.data);
      } catch (error) {
        console.error("Failed to fetch health data:", error);
      }
    };
    fetchHealthData();
  }, []);
  if (!healthData) return null;
  return (
    <Grid container spacing={3} sx={{ my: 3 }}>
      {/* Card 1: Tổng quan sức khỏe */}
      <Grid item size={{ xs: 6, md: 6 }}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardHeader
            avatar={<FavoriteBorderIcon color="error" />}
            title={
              <Typography variant="h6" fontWeight="bold">
                Tổng quan sức khỏe
              </Typography>
            }
            subheader="Thống kê từ quá trình cai thuốc"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Mức độ nguy cơ:{" "}
              <span
                style={{
                  color: healthData.riskColor,
                  fontWeight: "bold",
                }}
              >
                {healthData.riskLevel}
              </span>
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
              {healthData.riskDescription}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Lời khuyên sức khỏe:
            </Typography>

            <List dense>
              {healthData.healthRecommendations.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 2: Lợi ích sức khỏe theo thời gian */}
      <Grid item size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardHeader
            avatar={<FavoriteBorderIcon color="error" />}
            title={
              <Typography variant="h6" fontWeight="bold">
                Biểu đồ sức khoẻ
              </Typography>
            }
            subheader="Những gì đang xảy ra trong cơ thể bạn "
          />
          <CardContent sx={{ flexGrow: 1 }}>
            {Array.isArray(healthData?.waveData) &&
            healthData.waveData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthData.waveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#28a745"
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography color="text.secondary">
                Không có dữ liệu biểu đồ
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Health;
