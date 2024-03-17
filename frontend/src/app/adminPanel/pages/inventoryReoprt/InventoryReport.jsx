import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import AllMachine from "./machine/AllMachine";
import AllReagent from "./reagent/AllReagent";
import "./inventoryReport.css";

const InventoryReport = () => {
  const [showMachineReport, setShowMachineReport] = useState(true);
  return (
    <>
      <Layout>
        <div className="admin-dashboard">
          <div className="menu">
            <AdminMenu />
          </div>
          <div className="content">
            <div className="dashboard-heading">
              <h1 className="dashboard-heading">
                <u>Welcome to Inventory Report and Analysis</u>
              </h1>
            </div>
            <div className="i-report-btn">
              <button
                className="btn"
                style={{ background:`${showMachineReport? "blue" : "red"}` }}
                onClick={() => setShowMachineReport(false)}
              >
                Reagent Analysis and Report
              </button>
              <button
                className="btn"
                style={{ background:`${showMachineReport? "red" : "blue"}` }}
                onClick={() => setShowMachineReport(true)}
              >
                Machine Analysis and Report
              </button>
            </div>
            <div
              className="machine-details"
              style={{ display: `${showMachineReport? "block" : "none"}` }}
            >
              <AllMachine />
            </div>
            <div
              className="reagent-details"
              style={{ display: `${showMachineReport ? "none" : "block"}` }}
            >
             <AllReagent/>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default InventoryReport;
