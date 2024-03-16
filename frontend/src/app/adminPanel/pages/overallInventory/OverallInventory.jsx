import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Layout from "../../../layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BarChart from "../graphs/BarChart";
import PieChart from "../graphs/PieChart";

const OverallInventory = () => {
  const [totalBooking, setTotalBooking] = useState([]);
  const [testCompleted, setTestCompleted] = useState([]);
  const [testPendding, setTestPendding] = useState([]);
  const [totalTest, setTotalTest] = useState();
  const [monthData, setMonthData] = useState(0);
  const navigate = useNavigate();

  /* TOTAL TEST OVERALL */
  const getTotalBooking = async () => {
    try {
      const { data } = await axios.get("/api/v1/booking/get-all-booking");

      if (data) {
        setTotalBooking(data?.allBooking);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ALL BOOKINGs  */
  const getMonthData = async () => {
    try {
      const { data } = await axios.get("/api/v1/booking/get-all-booking/month");

      if (data) {
        setMonthData(data?.MonthsCount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /*BOOKING COMPLETED*/
  const bookingCompleted = async () => {
    try {
      const { data } = await axios.get("/api/v1/booking/get-completed-booking");

      if (data) {
        setTestCompleted(data?.bookingCompleted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*PENDDIN BOOKINGS*/
  const bookingPendding = async () => {
    try {
      const { data } = await axios.get("/api/v1/booking/get-pendding-booking");

      if (data) {
        setTestPendding(data?.bookingPendding);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ALL Test Available  */
  const getTotalTest = async () => {
    try {
      const { data } = await axios.get("/api/v1/test/all-test-count");

      if (data) {
        setTotalTest(data?.testCount);
        // console.log(data.allBooking);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong");
    }
  };
  /*CALLING ALL*/
  useEffect(() => {
    getTotalBooking();
    getTotalTest();
    bookingCompleted();
    bookingPendding();
  }, []);
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">
              {" "}
              <u>Overall Report Details</u>
            </h1>
          </div>
          <div className="overall-page">
            <div className="overall">
              <h2 style={{ background: "rgb(12, 76, 186)" }}>
                Total Test Appointment
              </h2>
              <p className="i-num">{totalBooking?.length}</p>

              <button
                onClick={() => {
                  navigate(
                    "/dashboard/admin/overall-inventory-details/total-booking"
                  );
                }}
                className="btn i-btn"
              >
                See Details
              </button>
            </div>

            <div className="overall">
              <h2 style={{ background: "rgb(35, 207, 29)" }}>
                Appointment Completed
              </h2>
              <p className="i-num">{testCompleted?.length}</p>
              <button
                className="btn i-btn"
                onClick={() => {
                  navigate(
                    "/dashboard/admin/overall-inventory-details/total-booking-completed"
                  );
                }}
              >
                See Details
              </button>
            </div>

            <div className="overall">
              <h2 style={{ background: "rgb(233, 105, 26)" }}>
                Pending Appointment
              </h2>
              <p className="i-num">{testPendding?.length}</p>
              <button
                className="btn i-btn"
                onClick={() => {
                  navigate(
                    "/dashboard/admin/overall-inventory-details/total-booking-pending"
                  );
                }}
              >
                See Details
              </button>
            </div>

            <div className="overall">
              <h2>Total Test</h2>
              <p className="i-num">{totalTest}</p>
              <p>Available </p>
            </div>
            {/* <div className="overall">
              <h2 style={{ background: "rgb(233, 26, 150)" }}>Suggestion</h2>
              <p>You need to increase nursues in the lab</p>
            </div> */}
          </div>
          <div className="graphs"></div>
        </div>
      </div>
    </Layout>
  );
};

export default OverallInventory;
