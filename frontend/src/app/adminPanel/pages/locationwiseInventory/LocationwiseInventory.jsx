import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Layout from "../../../layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BarChart from "../graphs/BarChart";

const LocationwiseInventory = () => {
  const [city, setCity] = useState("");
  const [totalBooking, setTotalBooking] = useState([]);
  const [testCompleted, setTestCompleted] = useState([]);
  const [totalTest, setTotalTest] = useState();
  const [showDetails, setShowDetails] = useState(false);
 const [blood, setBlood] = useState("");
 const [liver, setLiver] = useState("")
 const [thyorid, setThyorid] = useState("")
 const [kidney, setKidney] = useState("")
 const [vitamin, setVitamin] = useState("")
 const [diabetes, setDiabetes] = useState("")

  const navigate = useNavigate();
  let tCal = 15045;
  /*BOOKING TOTAL*/
  const getAllBooking = async (e) => {
    try {
      const { data } = await axios.get(
        `/api/v1/booking/get-all-booking/location-wise/${city}`
      );

      if (data) {
        setTotalBooking(data?.allBooking);
        console.log(data.allBooking);
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
        console.log(data.bookingCompleted);
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

  //* CATEGORY WISE DETAILS *//
  const getCategoryWise = async (e) => {
    e.preventDefault();
    try {
      const resBlood = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/blood/${city}`
      );
      setBlood(resBlood?.data?.categoryCount);

      const resLiver = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/liver/${city}`
      );
      setLiver(resLiver?.data?.categoryCount );

      const resVitamin = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/vitamin/${city}`
      );
      setVitamin(resVitamin?.data?.categoryCount);

      const resKidney = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/kedney/${city}`
      );
      setKidney(resKidney?.data?.categoryCount );

      const resDiabetes = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/diabetes/${city}`
      );
      setDiabetes(resDiabetes?.data?.categoryCount);

      const resThyorid = await axios.get(
        `/api/v1/booking/get-completed-booking/category-wise/thyroid/${city}`
      );
      setThyorid(resThyorid?.data?.categoryCount);
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong");
    }
  };

  const handelData = (e) => {
    e.preventDefault();
    if (!city) {
      toast.warn("Please choose city");
      return;
    }
    getAllBooking();
    bookingCompleted();
    getTotalTest();
    getCategoryWise(e);
    setShowDetails(true);
  };
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading"><u>Location Wise Report</u></h1>
          </div>
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
            <h2 className="detail"><u>Report of {city}</u></h2>

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

              <div className="overall">
                <h2 style={{ background: "rgb(154, 26, 233)" }}>
                  Revenue Generated
                </h2>
                <p className="i-num" id="i-revenue"><i class="fa-solid fa-indian-rupee-sign"></i>{tCal}</p>
                {/* <p>In Rupees</p> */}
              </div>

              <div className="overall">
                <h2>Inventory Stock</h2>
                <p className="i-num">{totalTest}</p>
                <p>Machine Available</p>
              </div>
              <div className="overall">
                <h2 style={{ background: "rgb(233, 26, 150)" }}>
                  Department Wise
                </h2>
                <p>Blood : {blood}</p>
                <p>Vitamin : {vitamin}</p>
                <p>Thyroid : {thyorid}</p>
                <p>Diabetes: {diabetes}</p>
                <p>Liver : {liver}</p>
                <p>Kidney : {kidney}</p>
              </div>
              <div>
                <BarChart testData = {[blood, kidney, liver, thyorid, vitamin, diabetes]}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LocationwiseInventory;
