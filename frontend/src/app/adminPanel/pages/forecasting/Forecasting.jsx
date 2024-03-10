import React from "react";
import "../../admin.css";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";

const Forecasting = () => {

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">Welcome toForecastinge</h1>
          </div>
          
            
          
        </div>
      </div>
    </Layout>
  );
};

export default Forecasting;
