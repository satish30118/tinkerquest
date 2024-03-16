import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const BarChartMonthly = ({ city }) => {
  const [currMonthData, setCurrMonthData] = React.useState({});
  const [preMonthData, setPreMonthData] = React.useState({});
  const [preToMonthData, setPreToMonthData] = React.useState({});

  /*BOOKING  Month Overall Details*/
  const bookingCurrMonth = async () => {
    try {
      // CURRENT MONTH DATA
      const total = await axios.get(`/api/v1/booking/month/${city}/1/overall`);
      setCurrMonthData({ ...currMonthData, overall: total?.data?.monthsCount });

      // CURRENT MONTH COMPLETED Details
      const complete = await axios.get(
        `/api/v1/booking/month/${city}/1/completed`
      );
      setCurrMonthData({
        ...currMonthData,
        completed: complete?.data?.monthsCount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /*BOOKING  Month Overall Details*/
  const bookingPreMonth = async () => {
    try {
      // CURRENT MONTH DATA
      const total = await axios.get(`/api/v1/booking/month/${city}/0/overall`);
      setPreMonthData({ ...currMonthData, overall: total?.data?.monthsCount });

      // CURRENT MONTH COMPLETED Details
      const complete = await axios.get(
        `/api/v1/booking/month/${city}/0/completed`
      );
      setPreMonthData({
        ...currMonthData,
        completed: complete?.data?.monthsCount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /*BOOKING  Month Overall Details*/
  const bookingPreToMonth = async () => {
    try {
      // CURRENT MONTH DATA
      const total = await axios.get(`/api/v1/booking/month/${city}/-1/overall`);
      setPreToMonthData({
        ...currMonthData,
        overall: total?.data?.monthsCount,
      });

      // CURRENT MONTH COMPLETED Details
      const complete = await axios.get(
        `/api/v1/booking/month/${city}/-1/completed`
      );
      setPreToMonthData({
        ...currMonthData,
        completed: complete?.data?.monthsCount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const currMonth = new Date().getMonth();
  const months = ["Jan", "Feb", "March", "April", "May"];

  const tData = [currMonthData.overall, currMonthData.completed];
  const cData = [preMonthData];
  const pData = [preToMonthData];

  const xLabels = [
    months[currMonth - 2],
    months[currMonth - 1],
    months[currMonth],
  ];

  React.useEffect(() => {
    bookingCurrMonth();
    bookingPreMonth();
    bookingPreToMonth();
  }, []);
  return (
    <>
      <BarChart
        width={600}
        height={300}
        series={[
          { data: tData, label: "Test Booked", id: "tId" },
          { data: cData, label: "Test Completed", id: "cId" },
          { data: pData, label: "Test Pending", id: "pId" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
      <div></div>
    </>
  );
};

export default BarChartMonthly;
