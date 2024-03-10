import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Layout from "../../../layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LocationwiseInventory = () => {
  const [city, setCity] = useState("");
  const [totalBooking, setTotalBooking] = useState([]);
  const [testCompleted, setTestCompleted] = useState([]);
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

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

  const handelData = () => {
    if (!city) {
      toast.warn("Please choose city");
      return;
    }
    getAllBooking();
    bookingCompleted();
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
            <h1 className="dashboard-heading">Location Wise Inventory</h1>
          </div>
          <div className="location">
            <select onChange={(e) => {setCity(e.target.value); setShowDetails(false)}}>
              <option value="">--Choose City--</option>
              <option value="Noida">1699021932207-Noida</option>
              <option value="Mumbai">1699108688232-Mumbai</option>
              <option value="Dehradun">1698935599382-Dehradun</option>
              <option value="Roorkee">1698921148662-Roorkee</option>
              <option value="Kolkata">1699281160794-Kolkata </option>
              <option value="Pune">1699194762631-Pune</option>
              <option value="Nagpur">1699007458706-Nagpur</option>\
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
            <h2 className="detail">Details Analysis in {city}</h2>

            <div className="overall-page">
              <div className="overall">
                <h2 style={{ background: "rgb(12, 76, 186)" }}>
                  Total Test Appointment
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
                <p className="i-num">$100</p>
              </div>
              <div className="overall">
                <h2>Total Inventory Stock</h2>
                <p className="i-num">434</p>
              </div>
              <div className="overall">
                <h2 style={{ background: "rgb(233, 26, 150)" }}>Suggestion</h2>
                <p>You need to increase nursues in the lab</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LocationwiseInventory;
