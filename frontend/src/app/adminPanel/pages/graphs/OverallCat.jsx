import React, { useEffect } from "react";
import Chart from "react-apexcharts";

const OverallCat = () => {

  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = new Date().getMonth() + 1;


  const dates = [ "1", "2", "3", "4", "5", "6" ];

  var state = {
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "PRODUCT D",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],

    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
        style: {
          color: "white",
          backgroundColor: "white",
        },
        color: "white",
      },
      xaxis: {
        type: "datetime",
        categories: dates,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
                // color: "white",
              },
            },
          },
        },
      },
      legend: {
        position: "top",
        offsetY: 50,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width={"50%"}
        height={400}
        // style={{ color: "white"}}
      />
    </>
  );
};

export default OverallCat;
