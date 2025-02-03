import React from "react";
import Layout from "../../layout/Layout";
import { useAuth } from "../../../contextAPI/authContext";
import UserMenu from "./UserMenu";
import UserLocationAnalysis from "./pages/bookingAnalysis/UserLocationAnalysis";

const UserDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <UserMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">Lab Associate Dashboard</h1>
          </div>
          <div>
            <UserLocationAnalysis/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
