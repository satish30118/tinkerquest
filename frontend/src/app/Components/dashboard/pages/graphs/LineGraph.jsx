import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function LineGraph({ d }) {
  return (
    <LineChart
      xAxis={[
        {
          data: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ],
        },
      ]}
      series={[
        {
          data: d,
          area: true,
        },
      ]}
      width={600}
      height={350}
    />
  );
}
