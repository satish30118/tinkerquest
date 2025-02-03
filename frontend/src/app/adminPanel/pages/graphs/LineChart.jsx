import Chart from "react-apexcharts";

export default function LineChart({d}) {
    
  let state = {
    series: [
      // {
      //   name: "Maximum Predicted Booking",
      //   data:d ,
      // },
      {
        name: "Predicted Booking",
        data: d,
      },
      // {
      //   name: "minimum Predicted Booking",
      //   data: [29, 30, 33, 30, 40, 30, 18, 22, 30, 30, 27, 36, 10, 15, 20, 21, 30, 26, 32, 8],
      // },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      title: {
        text: " Customer Analysis in Future",
        align: "center",
      },
      
      yaxis: {
        opposite: false,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="area"
      height={350}
      width={"95%"}
    />
  );
}
