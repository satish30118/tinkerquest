import axios from "axios";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const BarChartBooking = ({ city }) => {
  const [currMonthData, setCurrMonthData] = useState([]);
  const [preMonthData, setPreMonthData] = useState([]);
  const [PreToMonthData, setPreToMonthData] = useState([]);

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

  return <></>;
};

export default BarChartBooking;
