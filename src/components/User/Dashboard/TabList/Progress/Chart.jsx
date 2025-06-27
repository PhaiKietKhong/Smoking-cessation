import { BarChart } from "@mui/x-charts/BarChart";
import * as React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { USER_API_ROUTES } from "@/api/apiRouter";

const chartSetting = {
  yAxis: [
    {
      label: "Số điếu đã tránh",
      width: 80,
    },
  ],
  series: [
    {
      dataKey: "avoided",
      label: "Điếu thuốc đã tránh",
      valueFormatter: (value) => `${value}`,
      highlightScope: {
        highlighted: "series",
        faded: "global",
      },
    },
  ],
  height: 300,
};

export default function Chart() {
  const [dataset, setDataset] = React.useState([]);
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState("middle");

  React.useEffect(() => {
    const fetchProgressData = async () => {
      const token = localStorage.getItem("token");
      const endDate = dayjs().format("YYYY-MM-DD");
      const startDate = dayjs().subtract(14, "day").format("YYYY-MM-DD");

      try {
        const response = await axios.get(
          USER_API_ROUTES.GET_USER_PROGESS_BY_DATE_RANGE,
          {
            params: { startDate, endDate },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rawData = response.data;

        const result = rawData.map((entry) => ({
          date: dayjs(entry.date).format("DD/MM"),
          avoided: entry.cigarettesAvoided || 0,
        }));

        setDataset(result);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu progress:", error);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={dataset}
        xAxis={[{ dataKey: "date", tickLabelPlacement }]}
        {...chartSetting}
      />
    </div>
  );
}
