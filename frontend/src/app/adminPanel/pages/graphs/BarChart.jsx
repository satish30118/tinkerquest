import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({testData}) => {
  const state = {
    options: {
      chart: {
        id: "apexchart",
      },
      xaxis: {
        color :"white",
        categories: ["Blood", "Kidney", "Liver", "Thyorid", "Vitamin", "diabetes"],
      },
    },
    series: [
      {
        name: "Department Wise Test",
        data: testData,
      },
    ],
  };

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width={500}
        height={320}
      />
    </>
  );
};

export default BarChart;
