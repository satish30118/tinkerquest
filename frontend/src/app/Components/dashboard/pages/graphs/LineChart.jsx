import Chart from "react-apexcharts";

export default function LineChart({d}) {
    
  let state = {
    series: [
      {
        name: "Predicted Booking",
        data: d,
      },
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
      width={500}
    />
  );
}
