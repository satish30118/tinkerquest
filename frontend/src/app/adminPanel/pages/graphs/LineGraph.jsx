import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function LineGraph({ d, day }) {

  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
      series={[
        {
          data: d,
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
  );
}
