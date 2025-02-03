import * as React from "react";
import Chart from "react-apexcharts";

export default function Overall({ d1, d2,d3 }) {
    let state = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ["Last to Last Month", "Last Month", "This Month"]
          },
          title:{
            display:true,
            text:"Last 3 Months Test Analysis "
          }
        },
        series: [
          {
            name: "Test Booked",
            data: [d3[0], d2[0], d1[0]]
          },
          {
            name: "Test Completed",
            data:[d3[1], d2[1], d1[1]]
          },
          {
            name: "Test Pending",
            data: [d3[2], d2[2], d1[2]]
          }
        ]
      };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      width="98%"
      height={400}
    />
  );
}
