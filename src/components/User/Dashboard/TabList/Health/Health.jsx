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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceArea,
  Legend,
} from "recharts";

function Health() {
  const [brinkman, setBrinkman] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHealthData = async () => {
      const endDate = dayjs().format("YYYY-MM-DD");
      const startDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");

      try {
        const [brinkmanRes, progressRes] = await Promise.all([
          axios.get(USER_API_ROUTES.GET_BRINKMAN, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(USER_API_ROUTES.GET_USER_PROGESS_BY_DATE_RANGE, {
            params: { startDate: startDate, endDate: endDate },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        setProgressData(progressRes.data);
        setBrinkman(brinkmanRes.data);
      } catch (error) {
        console.error("Failed to fetch health data:", error);
      }
    };
    fetchHealthData();
  }, []);

  if (!brinkman || !progressData) return null;

  const formatTooltip = (value, name, props) => {
    const percent = (value * 100).toFixed(1);
    let risk = "Thấp";
    if (value < 0.3) risk = "Cao";
    else if (value < 0.6) risk = "Trung bình";
    return [`${percent}% hồi phục`, `Nguy cơ: ${risk}`];
  };

  const avg = (key) =>
    (
      progressData.reduce((sum, item) => sum + item[key], 0) /
      progressData.length
    ).toFixed(1);

  const chartData = progressData
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => ({
      date: dayjs(item.date).format("DD/MM"),
      mood: item.mood,
      stressLevel: item.stressLevel,
      cravingLevel: item.cravingLevel,
      healthScore: item.healthScore,
    }));

  return (
    <Grid container spacing={3} sx={{ my: 3 }}>
      {/* Card 1: Tổng quan sức khỏe */}
      <Grid item size={{ xs: 12, md: 6 }}>
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
                  color: brinkman.riskColor,
                  fontWeight: "bold",
                }}
              >
                {brinkman.riskLevel}
              </span>
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
              {brinkman.riskDescription}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Lời khuyên sức khỏe:
            </Typography>

            <List dense>
              {brinkman.healthRecommendations.map((item, index) => (
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

      {/* Card 2: Biểu đồ hồi phục */}
      <Grid item size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardHeader
            avatar={<FavoriteBorderIcon color="error" />}
            title={
              <Typography variant="h6" fontWeight="bold">
                Biểu đồ hồi phục sức khỏe
              </Typography>
            }
            subheader="Mô phỏng sự cải thiện sức khoẻ sau khi bỏ thuốc"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Trục X(Ngang): số ngày sau khi bỏ thuốc. Trục Y(Dọc): tỉ lệ hồi
              phục sức khỏe (0–100%). Màu nền thể hiện vùng nguy cơ sức khoẻ:{" "}
              <b style={{ color: "#dc3545" }}>Đỏ</b> (cao),{" "}
              <b style={{ color: "#ffc107" }}>Vàng</b> (trung bình),{" "}
              <b style={{ color: "#28a745" }}>Xanh</b> (thấp).
            </Typography>
            {Array.isArray(brinkman?.waveData) &&
            brinkman.waveData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={brinkman.waveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" tickFormatter={(x) => `${x} `} />
                  <YAxis
                    domain={[0, 1]}
                    tickFormatter={(y) => `${(y * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    formatter={formatTooltip}
                    labelFormatter={(label) => `Ngày ${label}`}
                  />
                  <ReferenceArea
                    y1={0}
                    y2={0.3}
                    fill="#dc3545"
                    fillOpacity={0.1}
                  />
                  <ReferenceArea
                    y1={0.3}
                    y2={0.6}
                    fill="#ffc107"
                    fillOpacity={0.1}
                  />
                  <ReferenceArea
                    y1={0.6}
                    y2={1}
                    fill="#28a745"
                    fillOpacity={0.1}
                  />
                  <Legend
                    payload={[
                      {
                        value: "Nguy cơ cao",
                        type: "square",
                        color: "#dc3545",
                      },
                      {
                        value: "Nguy cơ trung bình",
                        type: "square",
                        color: "#ffc107",
                      },
                      {
                        value: "Nguy cơ thấp",
                        type: "square",
                        color: "#28a745",
                      },
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#28a745"
                    dot={false}
                    isAnimationActive={false}
                    name="Tỷ lệ hồi phục"
                    strokeDasharray="5 5"
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

      {/* Card 3: Biểu đồ sức khoẻ */}
      <Grid item size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardHeader
            avatar={<FavoriteBorderIcon color="error" />}
            title={
              <Typography variant="h6" fontWeight="bold">
                Thông tin sức khỏe trung bình
              </Typography>
            }
            subheader="Dựa trên dữ liệu 30 ngày gần nhất"
          />

          {progressData.length > 0 ? (
            <CardContent>
              <Typography variant="body1" gutterBottom>
                💤 Giấc ngủ trung bình: <strong>{avg("sleepHours")} giờ</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                🏃‍♂️ Thể dục trung bình:{" "}
                <strong>{avg("exerciseMinutes")} phút</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                ⚖️ Cân nặng trung bình: <strong>{avg("weight")} kg</strong>
              </Typography>
            </CardContent>
          ) : (
            <Typography variant="h5" sx={{ p: 2 }}>
              Bạn chưa có viết nhật ký để hiển thị thông tin!
            </Typography>
          )}
        </Card>
      </Grid>

      {/* Card 4: Biểu đồ hồi phục mood... */}
      <Grid item size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardHeader
            avatar={<FavoriteBorderIcon color="error" />}
            title={
              <Typography variant="h6" fontWeight="bold">
                Biểu đồ cảm xúc & sức khỏe
              </Typography>
            }
            subheader="Theo thời gian 30 ngày gần đây"
          />

          <CardContent sx={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#3f51b5"
                  name="Tâm trạng"
                />
                <Line
                  type="monotone"
                  dataKey="stressLevel"
                  stroke="#e91e63"
                  name="Căng thẳng"
                />
                <Line
                  type="monotone"
                  dataKey="cravingLevel"
                  stroke="#ff9800"
                  name="Thèm thuốc"
                />
                <Line
                  type="monotone"
                  dataKey="healthScore"
                  stroke="#4caf50"
                  name="Sức khỏe"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Health;
