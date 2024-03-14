import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ category, value }) => {
  const state = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      dataLabels: {
        style: {
          // colors: ["#F44336", "#E91E63"],
        },
      },
      fill: {
        colors: ["rgb(0,255,0)", "#FF0000"],
      },
    },
    series: value,
    labels: category,
  };
  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        width={500}
        height={320}
      />
    </>
  );
};

export default PieChart;
