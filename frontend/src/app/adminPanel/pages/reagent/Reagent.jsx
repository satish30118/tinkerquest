import React, { useState } from "react";

import "../../admin.css";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import AddNewReagent from "./AddNewReagent";
import AllReagent from "./AllReagent";

const Reagent = () => {
  const [addNew, setAddNew] = useState(false);
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
            <button className="btn" onClick={() =>setAddNew(true)}>
              Add New Reagent
            </button>
          </div>

          <div 
          style={{ display: `${addNew ? "block" : "none"}` }}
          >
            <AddNewReagent />
          </div>

          <div>
            <AllReagent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reagent;
