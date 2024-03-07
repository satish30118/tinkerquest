import React from "react";
import Layout from "../../layout/Layout";
import { useAuth } from "../../../contextAPI/authContext";
import UserMenu from "./UserMenu";

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
            <h1 className="dashboard-heading">Welcome to Dashboard</h1>
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

export default UserDashboard;
