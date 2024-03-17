import React, { useEffect } from "react";
import Chart from "react-apexcharts";

const OverallCat = ({predict}) => {

  var state = {
    series: [
      {
        name: [ "1", "2", "3", "4", "5", "6" ],
        data: predict,
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
        width={"90%"}
        height={"90%"}
        // style={{ color: "white"}}
      />
    </>
  );
};

export default OverallCat;
