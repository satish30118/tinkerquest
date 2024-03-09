import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Layout from "../../../layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OverallInventory = () => {
  const [totalBooking, setTotalBooking] = useState([]);
  const [testCompleted, setTestCompleted] = useState([]);
  const [testPendding, setTestPendding] = useState([])
  const navigate = useNavigate()


  /* ALL BOOKINGs */
  const getTotalBooking = async () => {
    try {
      const { data } = await axios.get("/api/v1/booking/get-all-booking");

      if (data) {
        setTotalBooking(data?.allBooking);
        console.log(data.allBooking);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  

  /*BOOKING COMPLETED*/
  const bookingCompleted = async () => {
    try {
      const { data } = await axios.get("/api/v1/booking/get-completed-booking");

      if (data) {
        setTestCompleted(data?.bookingCompleted);
        console.log(data.bookingCompleted);
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
        console.log(data.bookingPendding);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };



  /*CALLING ALL*/
  useEffect(() => {
    getTotalBooking();
    bookingCompleted();
    bookingPendding()
  }, []);
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">Overall Inventory Details</h1>
          </div>
          <div className="overall-page">
            <div className="overall">
              <h2>Total Test Appointment</h2>
              <p>{totalBooking?.length}</p>
              <button onClick={()=>{navigate("/dashboard/admin/overall-inventory-details/total-booking")}} className="btn">See Details</button>
            </div>

            <div className="overall">
              <h2>Appointment Completed</h2>
              <p>{testCompleted?.length}</p>
              <button className="btn" onClick={()=>{navigate("/dashboard/admin/overall-inventory-details/total-booking-completed")}} >See Details</button>
            </div>

            <div className="overall">
              <h2>Pending Appointment</h2>
              <p>{testPendding?.length}</p>
              <button className="btn" onClick={()=>{navigate("/dashboard/admin/overall-inventory-details/total-booking-pending")}} >See Details</button>
            </div>

            <div className="overall">
              <h2>Revenue Generated</h2>
              <p>$100</p>
            </div>
            <div className="overall">
              <h2>Total Inventory Stock</h2>
              <p>434</p>
            </div>
            <div className="overall">
              <h2>Suggestion</h2>
              <p>You need to increase nursues in the lab</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OverallInventory;
