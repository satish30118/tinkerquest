import * as React from "react";
import Chart from "react-apexcharts";

export default function CatBar({ d}) {
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
            data: [d]
          },
         
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
