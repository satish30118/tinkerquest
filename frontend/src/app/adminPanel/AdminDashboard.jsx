import React, { useState } from "react";
import Layout from "../layout/Layout";
import AdminMenu from "./pages/AdminMenu";
import "./admin.css";
import { useAuth } from "../../contextAPI/authContext";
import LocationwiseInventory from "./pages/locationwiseBooking/LocationwiseInventory";
import OverallInventory from "./pages/overallBooking/OverallInventory";

const AdminDashboard = () => {
  const [overall, setOverall] =useState(true)
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">
              <u>Dashboard</u>
            </h1>
          </div>

          <div className="order-btn">
            <button
              className="btn"
              onClick={() => setOverall(true)}
              style={{ background: `${overall ? "red" : "blue"}`,  textDecoration:`${overall ? "underline" : "none"}`,fontSize:`${overall ? "23px" : "18px"}`}}
            >
              Entire Inventory Dashboard
            </button>
            <button
              className="btn"
              onClick={() => setOverall(false)}
              style={{ background: `${overall ? "blue" : "red"}`, textDecoration:`${overall ? "none" : "underline"}`,fontSize:`${overall ? "18px" : "23px"}`}}
            >
              Locationwise Inventory Dashboard
            </button>
          </div>

          <div style={{display:`${overall ? "block" : "none"}`}}>
            <OverallInventory/>
          </div>

          <div style={{display:`${overall ? "none" : "block"}`}}>
            <LocationwiseInventory/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
