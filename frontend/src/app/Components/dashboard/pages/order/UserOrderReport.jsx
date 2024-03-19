import React, { useState } from "react";
import "./order.css";
import UserMenu from "../../UserMenu";
import UserTrackMachine from "./UserTrackMachine";
import UserTrackReagent from "./UserTrackReagent";
import Layout from "../../../../layout/Layout";

const UserOrderReport = () => {
  const [showMachine, setShowMachine] = useState(true);
  return (
    <>
      <Layout>
        <div className="admin-dashboard">
          <div className="menu">
            <UserMenu />
          </div>
          <div className="content">
            <div className="dashboard-heading">
              <h1 className="dashboard-heading">
                <u>Welcome to Inventory Order Tracking</u>
              </h1>
            </div>

            <div className="order-btn">
              <button
                className="btn"
                style={{ background: `${showMachine ? "blue" : "red"}` }}
                onClick={() => setShowMachine(false)}
              >
                Track Ordered Reagent
              </button>
              <button
                className="btn"
                style={{ background: `${showMachine ? "red" : "blue"}` }}
                onClick={() => setShowMachine(true)}
              >
                Track Ordered Machine
              </button>
            </div>
            <div
              className="machine-details"
              style={{ display: `${showMachine ? "block" : "none"}` }}
            >
              <UserTrackMachine />
            </div>
            <div
              className="reagent-details"
              style={{ display: `${showMachine ? "none" : "block"}` }}
            >
              <UserTrackReagent />
            </div>
          </div>
        </div>
      
      </Layout>
    </>
  );
};

export default UserOrderReport;
