import React, { useState } from "react";
import { useAuth } from "../../contextAPI/authContext";
import { Drawer } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/header.css";
import logo from "../assets/image/logo.webp";

const SideDrawer = () => {
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("userInfo");
    const timer = setTimeout(() => {
      toast.success("Logout Successfully!!");
    }, 100);

    return;
  };

  const handleRedirect = () => {
    if (auth?.token) {
      navigate("/new-test-booking");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        style={{
          color: "darkblue",
          fontSize: "25px",
          padding: "5px 10px",
          margin: "10px",
          background: "transparent",
          border: "none",
          zIndex: "100",
        }}
      >
        {" "}
        <i className="fa-solid fa-bars"></i>
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla "
        style={{
          marginTop: "70px",
          zIndex: "20000000000",
          width: "100%",
          maxWidth: "320px",
          minWidth: "280px",
        }}
      >
        <div className="side-drawer-link">
          <div className="navbar-left">
            <img src={logo} alt="" />
          </div>
          <div style={{paddingTop:"40px"}}>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to="/new-test-booking">Book Test</NavLink>
            {!auth.user ? (
              <NavLink to={"/login"}>Login/Register</NavLink>
            ) : (
              <>
                <NavLink
                  to={`/dashboard/${auth?.user?.isAdmin ? "admin" : "user"}`}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to={"/login"}
                  onClick={handleLogout}
                  style={{ color: "red" }}
                >
                  <i
                    class="fa fa-sign-in"
                    style={{ marginRight: "7px", color: "red" }}
                  ></i>
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SideDrawer;
