import React, { useEffect, useState } from "react";

import "../../admin.css";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import { useAuth } from "../../../../contextAPI/authContext";
import "./machine.css";
import AddNewMachine from "./AddNewMachine";
import AllMachine from "./AllMachine";

const MachineReport = () => {
  const [showAddNew, setShowAddNew] = useState(false);
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">
              <u>Inventory performance</u>
            </h1>
          </div>
          <div>
            <button className="btn" onClick={() => setShowAddNew(true)} style={{background:"blue"}}>
              Add New Machine
            </button>
          </div>
          <div style={{ display: `${showAddNew ? "block" : "none"}` }}>
            <AddNewMachine />
          </div>
          <div>
            <AllMachine />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MachineReport;
