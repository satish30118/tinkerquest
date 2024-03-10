import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
      <button
        onClick={toggleDrawer}
        style={{
          position: "fixed",
          color: "blue",
          fontSize: "25px",
          padding: "5px 10px",
          margin: "10px",
          background: "transparent",
          border: "none",
          zIndex: "100",
        }}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
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
        <div className="admin-menu-page">
          {/* <div>
            <button onClick={toggleDrawer}>
              <i className="fa-solid fa-close"></i>
            </button>
          </div> */}

          <h1>Admin Panel</h1>

          <div className="admin-img">
            <img src="https://previews.123rf.com/images/captainvector/captainvector1509/captainvector150900359/45343495-dentist.jpg" alt="" />
          </div>

          <NavLink exact to={"/dashboard/admin/overall-inventory-details"}>
            Overall Inventory
          </NavLink>

          <NavLink to={"/dashboard/admin/location-wise-inventory-details"}>
            Location Wise Inventory
          </NavLink>

          <NavLink to={"/dashboard/admin/new-test-booking"}>Book Test</NavLink>
          <NavLink to={"/dashboard/admin/add-new-test-method"}>
            Add New Test Method
          </NavLink>
        </div>
      </Drawer>
    </>
  );
};

export default AdminMenu;
