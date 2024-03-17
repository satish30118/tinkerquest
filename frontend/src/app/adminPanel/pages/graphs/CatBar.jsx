import * as React from "react";
import Chart from "react-apexcharts";

export default function CatBar({ d1, d2,d3,d4,d5,d6 }) {
    let state = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [ "Department wise Booking"]
          }
        },
        series: [
          {
            name: "Blood",
            data: [d1]
          },
          {
            name: "Vitamin",
            data: [d2]
          },
          {
            name: "Diabetes",
            data: [d3]
          },
          {
            name: "Kidney",
            data: [d4]
          },
          {
            name: "Liver",
            data:[d5]
          },
          {
            name: "Thyroid",
            data: [d6]
          }
        ]
      };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      width="500"
    />
  );
}
