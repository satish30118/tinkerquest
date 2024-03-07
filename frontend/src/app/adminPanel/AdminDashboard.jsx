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
          <div>
            <p>Name:- {auth?.user?.name}</p>
            <p>Email:- {auth?.user.email}</p>
            <p>Phone:- {auth?.user.phone}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
