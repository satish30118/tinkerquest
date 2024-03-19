import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Progress from "../graphs/Progress";
import Overall from "../graphs/Overall";
import CatBar from "../graphs/CatBar";
import PieChartBooking from "../graphs/PieChartBooking";

const LocationwiseInventory = () => {
  const [city, setCity] = useState("");
  const [totalBooking, setTotalBooking] = useState([]);
  const [testCompleted, setTestCompleted] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [currMonthData, setCurrMonthData] = useState([0, 0, 0]);
  const [preMonthData, setPreMonthData] = useState([0, 0, 0]);
  const [preToMonthData, setPreToMonthData] = useState([0, 0, 0]);
  const [blood, setBlood] = useState(0);
  const [thyroid, setThyroid] = useState(0);
  const [vitamin, setVitamin] = useState(0);
  const [liver, setLiver] = useState(0);
  const [diabetes, setDiabetes] = useState(0);
  const [kidney, setKidney] = useState(0);
  const [bl, setBl] = useState(0);
  const [th, setTh] = useState(0);
  const [vi, setVi] = useState(0);
  const [li, setLi] = useState(0);
  const [di, setDi] = useState(0);
  const [ki, setKi] = useState(0);

  const navigate = useNavigate();

  /* ALL BOOKINGs  MONTH WISE*/
  const getMonthData = async () => {
    try {
      const m1 = await axios.get(`/api/v1/booking/month/${city}/1`);

      if (m1) {
        setCurrMonthData(m1?.data?.MonthsCount);
        console.log(currMonthData);
        console.log(currMonthData[0]);
      }
      const m2 = await axios.get(`/api/v1/booking/month/${city}/0`);

      if (m2) {
        setPreMonthData(m2?.data?.MonthsCount);
      }
      const m3 = await axios.get(`/api/v1/booking/month/${city}/-1`);

      if (m3) {
        setPreToMonthData(m3?.data?.MonthsCount);
      }

    } catch (error) {
      console.log(error);
    }
  };

  /*BOOKING TOTAL*/
  const getAllBooking = async (e) => {
    try {
      const { data } = await axios.get(
        `/api/v1/booking/get-all-booking/location-wise/${city}`
      );

      if (data) {
        setTotalBooking(data?.allBooking);
        // console.log(data.allBooking);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*BOOKING COMPLETED*/
  const bookingCompleted = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/booking/get-completed-booking/location-wise/${city}`
      );

      if (data) {
        setTestCompleted(data?.bookingCompleted);
        // console.log(data.bookingCompleted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* BOOKING CATEGORY WISE OVERALL */
  const bookingCatWise = async () => {
    try {
      const res1 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/blood/${city}`
      );
      setBlood(res1?.data?.categoryCount);

      const res2 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/vitamin/${city}`
      );
      setVitamin(res2?.data?.categoryCount);

      const res3 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/thyroid/${city}`
      );
      setThyroid(res3?.data?.categoryCount);
      const res4 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/liver/${city}`
      );
      setLiver(res4?.data?.categoryCount);

      const res5 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/diabetes/${city}`
      );
      setDiabetes(res5?.data?.categoryCount);

      const res6 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/kedney/${city}`
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
        `/api/v1/booking/get-completed-booking/category-wise/this-month/blood/${city}`
      );
      setBl(res1?.data?.categoryCount);

      const res2 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/vitamin/${city}`
      );
      setVi(res2?.data?.categoryCount);

      const res3 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/thyroid/${city}`
      );
      setTh(res3?.data?.categoryCount);
      const res4 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/liver/${city}`
      );
      setLi(res4?.data?.categoryCount);

      const res5 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/diabetes/${city}`
      );
      setDi(res5?.data?.categoryCount);

      const res6 = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/this-month/kedney/${city}`
      );
      setKi(res6?.data?.categoryCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handelData = (e) => {
    // e.preventDefault();
    if (!city) {
      toast.warn("Please choose city");
      return;
    }
    getAllBooking();
    bookingCompleted();
    getMonthData();
    bookingCatWise();
    bookingCatWiseCurrMonth();
    setShowDetails(true);
  };
  return (
    <>
      <div className="content">
        <div className="location">
          <select
            onChange={(e) => {
              setCity(e.target.value);
              setShowDetails(false);
            }}
          >
            <option value="">--- Choose City ---</option>
            <option value="Noida">1699021932207-Noida</option>
            <option value="Mumbai">1699108688232-Mumbai</option>
            <option value="Dehradun">1698935599382-Dehradun</option>
            <option value="Roorkee">1698921148662-Roorkee</option>
            <option value="Kolkata">1699281160794-Kolkata </option>
            <option value="Pune">1699194762631-Pune</option>
            <option value="Nagpur">1699007458706-Nagpur</option>
            <option value="Lucknow">1699540301350-Lucknow</option>
            <option value="Patna">1699166014219-Patna</option>
          </select>

          <button className="btn" onClick={handelData}>
            Get Details
          </button>
        </div>

        <div
          className="overall-page"
          style={{ display: `${showDetails ? "block" : "none"}` }}
        >
          <h2 className="detail">
            <u>Report of {city}</u>
          </h2>

          <div className="overall-page">
            <div className="overall">
              <h2 style={{ background: "rgb(12, 76, 186)" }}>
                <u>Total Test Appointment</u>
              </h2>
              <p className="i-num">{totalBooking?.length}</p>
              <button
                className="btn i-btn"
                onClick={() => {
                  navigate(
                    `/dashboard/admin/location-wise-inventory-details/total-booking/${city}`
                  );
                }}
              >
                See details
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
                    `/dashboard/admin/location-wise-inventory-details/total-booking-completed/${city}`
                  );
                }}
              >
                See details
              </button>
            </div>

            <div className="overall">
              <h2 style={{ background: "rgb(233, 105, 26)" }}>
                Pending Appointment
              </h2>
              <p className="i-num">
                {totalBooking?.length - testCompleted?.length}
              </p>
              <button
                className="btn i-btn"
                onClick={() => {
                  navigate(
                    `/dashboard/admin/location-wise-inventory-details/total-booking-pending/${city}`
                  );
                }}
              >
                See details
              </button>
            </div>
          </div>
          <div
            className="graph"
            style={{
              display: "flex",
              justifyContent:"space-evenly",
              flexWrap:"wrap",
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "white",
                margin:"30px 0",
                width:"560px",
                padding:"30px"
              }}
            >
              <h2 style={{ textAlign: "center" }}>Overall Booking Analysis</h2>
              <Overall
                d1={currMonthData}
                d2={preMonthData}
                d3={preToMonthData}
              />
            </div>
            <div
              style={{
                background: "white",
                margin:"30px 0",
                width:"560px",
                padding:"30px"
              }}
            >
              <h2 style={{ textAlign: "center" }}>
                Overall Department Wise Booking
              </h2>
              <PieChartBooking
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
                margin:"30px 0",
                width:"560px",
                padding:"30px"
              }}
            >
              <h2 style={{ textAlign: "center" }}>
                This Month Department Wise Booking
              </h2>
              <PieChartBooking
                d1={bl}
                d2={vi}
                d3={di}
                d4={ki}
                d5={li}
                d6={th}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationwiseInventory;
