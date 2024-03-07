import React from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../layout/Layout";

const Users = () => {
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">Manage Users Here</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
