import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import "./order.css"
import OrderMachine from "./OrderMachine";
import OrderReagent from "./OrderReagent";

const OrderReport = () => {
  const [showMachine, setShowMachine] = useState(true);
  const [orderMachine, setOrderMachine] = useState(false);
  const [orderReagent, setOrderReagent] = useState(false);
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
                <u>Welcome to Inventory Order Details</u>
              </h1>
            </div>

            <div className="order-btn">
              <button className="btn" onClick={()=> setOrderMachine(true)}>New Ordered Machine</button>
              <button className="btn" onClick={()=> setOrderReagent(true)}>New Ordered Reagent</button>
              <button className="btn" style={{ background: "blue" }} onClick={()=>setShowMachine(false)}>
                Track Ordered Reagent
              </button>
              <button className="btn" style={{ background: "blue" }}  onClick={()=>setShowMachine(true)}>
                Track Ordered Machine 
              </button>
            </div>
            <div
              className="machine-details"
              style={{ display: `${showMachine ? "block" : "none"}` }}
            >
              Machine
            </div>
            <div
              className="reagent-details"
              style={{ display: `${showMachine ? "none" : "block"}` }}
            >
              Reagent
            </div>
          </div>
        </div>
        <div className="order-inven" style={{display:`${orderMachine ? "block" :"none"}`}}>
            <OrderMachine popUp={setOrderMachine}/>
        </div>
        <div className="order-inven" style={{display:`${orderReagent ? "block" :"none"}`}}>
            <OrderReagent popUp={setOrderReagent}/>
        </div>
      </Layout>
    </>
  );
};

export default OrderReport;