import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const state = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "series-2",
        data: [20, 24, 45, 23, 49, 64, 72, 45, 115],
      },
    ],
  };
  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="histogram"
        width={500}
        height={320}
      />
    </>
  );
};

export default PieChart;
