import React from "react";
import Layout from "../layout/Layout";
import AdminMenu from "./pages/AdminMenu";
import "./admin.css";
import { useAuth } from "../../contextAPI/authContext";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">Welcome to Admin Page</h1>
          </div>
          {/* <div
            style={{
              textAlign: "center",
              fontWeight: "600",
              marginTop: "130px",
              fontSize:"22px"
            }}
          >
            <p>Name:- {auth?.user?.name}</p>
            <p>Email:- {auth?.user.email}</p>
            <p>Phone:- {auth?.user.phone}</p>

          </div> */}
          <div className="admin-manage">
            <div className="forecast">
              <img src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160283465/53589630-graph.jpg" alt="" />
              <p>Inventory Forecasting</p>
            </div>
            <div className="management">
              <img src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160227455/53072917-soccer-first-aid-kit.jpg" alt="" />
              <p>Inventory Management</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
