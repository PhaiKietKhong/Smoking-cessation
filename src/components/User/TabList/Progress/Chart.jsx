import { BarChart } from "@mui/x-charts/BarChart";
import * as React from "react";
const dataset = [
  {
    Cigarettes: 0,
    month: "Jan",
  },
  {
    Cigarettes: 0,
    month: "Feb",
  },
  {
    Cigarettes: 0,
    month: "Mar",
  },
  {
    Cigarettes: 0,
    month: "Apr",
  },
  {
    Cigarettes: 0,
    month: "May",
  },
  {
    Cigarettes: 0,
    month: "June",
  },
  {
    Cigarettes: 0,
    month: "July",
  },
  {
    Cigarettes: 0,
    month: "Aug",
  },
  {
    Cigarettes: 8,
    month: "Sem",
  },
  {
    Cigarettes: 5,
    month: "Oct",
  },
  {
    Cigarettes: 4,
    month: "Nov",
  },
  {
    Cigarettes: 1,
    month: "Dec",
  },
];

function valueFormatter(value) {
  return `${value}`;
}

const chartSetting = {
  yAxis: [
    {
      label: "Cigarettes",
      width: 60,
    },
  ],
  series: [
    {
      dataKey: "Cigarettes",
      label: "Cigarettes",
      valueFormatter,
      highlightScope: {
        highlighted: "series",
        faded: "global",
      },
    },
  ],
  height: 300,
};

export default function Chart() {
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState("middle");

  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={dataset}
        xAxis={[{ dataKey: "month", tickLabelPlacement }]}
        {...chartSetting}
      />
    </div>
  );
}
