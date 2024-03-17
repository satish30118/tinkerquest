import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Overall from "../graphs/Overall";
import Progress from "../graphs/Progress";
import CatBar from "../graphs/CatBar";

const OverallInventory = () => {
  const [totalBooking, setTotalBooking] = useState([]);
  const [testCompleted, setTestCompleted] = useState([]);
  const [testPendding, setTestPendding] = useState([]);
  const [totalTest, setTotalTest] = useState();
  const [currMonthData, setCurrMonthData] = useState([0, 0, 0]);
  const [preMonthData, setPreMonthData] = useState([0, 0, 0]);
  const [preToMonthData, setPreToMonthData] = useState([0, 0, 0]);
  const [blood, setBlood] = useState(0);
  const [thyroid, setThyroid] = useState(0);
  const [vitamin, setVitamin] = useState(0);
  const [liver, setLiver] = useState(0);
  const [diabetes, setDiabetes] = useState(0);
  const [kidney, setKidney] = useState(0);
  const navigate = useNavigate();
  const [bl, setBl] = useState(0);
  const [th, setTh] = useState(0);
  const [vi, setVi] = useState(0);
  const [li, setLi] = useState(0);
  const [di, setDi] = useState(0);
  const [ki, setKi] = useState(0);

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

  /* ALL BOOKINGs MONTH WISE */
  const getMonthData = async () => {
    try {
      const m1 = await axios.get("/api/v1/booking/month-overall/1");

      if (m1) {
        setCurrMonthData(m1?.data?.MonthsCount);
        console.log(currMonthData);
        console.log(currMonthData[0]);
      }
      const m2 = await axios.get("/api/v1/booking/month-overall/0");

      if (m2) {
        setPreMonthData(m2?.data?.MonthsCount);
      }
      const m3 = await axios.get("/api/v1/booking/month-overall/-1");

      if (m3) {
        setPreToMonthData(m3?.data?.MonthsCount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* BOOKING CATEGORY WISE OVERALL */
  const bookingCatWise = async () => {
    try {
      const res1 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/blood/overall`
      );
      setBlood(res1?.data?.categoryCount);

      const res2 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/vitamin/overall`
      );
      setVitamin(res2?.data?.categoryCount);

      const res3 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/thyroid/overall`
      );
      setThyroid(res3?.data?.categoryCount);
      const res4 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/liver/overall`
      );
      setLiver(res4?.data?.categoryCount);

      const res5 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/diabetes/overall`
      );
      setDiabetes(res5?.data?.categoryCount);

      const res6 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/kedney/overall`
      );
      setKidney(res6?.data?.categoryCount);
    } catch (error) {
      console.log(error);
    }
  };

   /* BOOKING CATEGORY WISE CURRENT MONTH */
   const bookingCatWiseCurrMonth = async () => {
    try {
      const res1 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/blood/overall`
      );
      setBl(res1?.data?.categoryCount);

      const res2 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/vitamin/overall`
      );
      setVi(res2?.data?.categoryCount);

      const res3 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/thyroid/overall`
      );
      setTh(res3?.data?.categoryCount);
      const res4 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/liver/overall`
      );
      setLi(res4?.data?.categoryCount);

      const res5 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/diabetes/overall`
      );
      setDi(res5?.data?.categoryCount);

      const res6 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/kedney/overall`
      );
      setKi(res6?.data?.categoryCount);
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

  /*PENDDING BOOKINGS*/
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
    bookingCatWise();
    bookingCatWiseCurrMonth();
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
          <p className="i-num" id="i-revenue">
            <i class="fa-solid fa-rupee-sign"></i>34256
          </p>
        </div>
      </div>

      <div
        className="graph"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            margin: "30px",
            width: "560px",
            padding: "30px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Overall Booking Analysis</h2>
          <Overall d1={currMonthData} d2={preMonthData} d3={preToMonthData} />
        </div>
        <div
          style={{
            background: "white",
            margin: "30px",
            width: "560px",
            padding: "30px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Overall Department Wise Booking
          </h2>
          <CatBar
            d1={blood}
            d2={vitamin}
            d3={diabetes}
            d4={kidney}
            d5={liver}
            d6={thyroid}
          />
        </div>
        <div
              style={{
                background: "white",
                margin:"30px",
                width:"560px",
                padding:"30px"
              }}
            >
              <h2 style={{ textAlign: "center" }}>
                This Month Department Wise Booking
              </h2>
              <CatBar
                d1={bl}
                d2={vi}
                d3={di}
                d4={ki}
                d5={li}
                d6={th}
              />
            </div>
      </div>
    </>
  );
};

export default OverallInventory;
