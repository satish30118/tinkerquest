import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Overall from "../graphs/Overall";



const OverallInventory = () => {
  const [totalBooking, setTotalBooking] = useState([]);
  const [testCompleted, setTestCompleted] = useState([]);
  const [testPendding, setTestPendding] = useState([]);
  const [totalTest, setTotalTest] = useState();
  const [currMonthData, setCurrMonthData] = useState();
  const [preMonthData, setPreMonthData] = useState();
  const [preToMonthData, setPreToMonthData] = useState();
  const [showGraph, setShowGraph] = useState(false)
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
      const m1 = await axios.get("/api/v1/booking/month-overall/1");

      if (m1) {
        setCurrMonthData(m1?.data?.monthsCount);
      }
      const m2 = await axios.get("/api/v1/booking/month-overall/0");

      if (m2) {
        setPreMonthData(m2?.data?.monthsCount);
      }
      const m3 = await axios.get("/api/v1/booking/month-overall/-1");

      if (m3) {
        setPreToMonthData(m3?.data?.monthsCount);
      }

      setShowGraph(true)
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
    getMonthData();
  }, []);
  return (
    
    <>
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
            <div className="overall">
              <h2 style={{ background: "rgb(233, 26, 150)" }}>Revenue</h2>
              <p className="i-num" id="i-revenue"><i class="fa-solid fa-rupee-sign"></i>34256</p>
            </div>
          </div>

          <div className="graph">
            <div style={{display:`${showGraph ? "block" : "none"}`}}>
              <Overall m1={currMonthData} m2={preMonthData}  m3={preToMonthData}/>
            </div>
          </div>
     </>
  )
};

export default OverallInventory;
