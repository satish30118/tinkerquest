import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contextAPI/authContext";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import Drawer from "react-modern-drawer";

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
    <div>
      <button
        onClick={toggleDrawer}
        style={{
          position: "fixed",
          color: "black",
          fontSize: "25px",
          padding: "2px 10px",
          borderRadius:"5px",
          margin: "10px",
          background: "lightblue",
          border: "none",
          zIndex: "100",
        }}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla "
        style={{
          marginTop: "70px",
          zIndex: "200",
          width: "100%",
          maxWidth: "320px",
          minWidth: "280px",
        }}
      >
        <div className="admin-menu-page" style={{ overflow: "auto" }}>
          {/* <div>
            <button onClick={toggleDrawer}>
              <i className="fa-solid fa-close"></i>
            </button>
          </div> */}

          <br />
      

          <div className="admin-img">
            <img
              src="https://previews.123rf.com/images/captainvector/captainvector1509/captainvector150900359/45343495-dentist.jpg"
              alt=""
            />
          </div>

          <div
            className="admin-details"
            style={{ fontWeight: "700", margin: "10px 0", textAlign: "center" }}
          >
            <p>
              <i
                class="fa-solid fa-circle-user"
                style={{ marginRight: "3px" }}
              ></i>{" "}
              {auth?.user?.name}
            </p>
            <p>
              <i
                class="fa-solid fa-envelope"
                style={{ marginRight: "3px" }}
              ></i>{" "}
              {auth?.user?.email}
            </p>
          </div>
          <Link to={"/dashboard/admin"}>Booking Dashboard</Link>
          <NavLink to={"/dashboard/admin/inventory-report-and-analysis"}>
            Inventory Report and Analysis
          </NavLink>
          <NavLink exact to={"/dashboard/admin/forecasting"}>
            Forecasting
          </NavLink>
          <NavLink exact to={"/dashboard/admin/inventory-order-tracking"}>
            Inventory Order Tracking
          </NavLink>
          <NavLink exact to={"/dashboard/admin/add-new-test-method"}>
            Add New Test Method
          </NavLink>
          <NavLink exact to={"/dashboard/admin/chat"}>
            Chat
          </NavLink>
          <NavLink to={"/dashboard/admin/users"}>Manage User</NavLink>
        </div>
      </Drawer>
    </>
  );
};

export default AdminMenu;
