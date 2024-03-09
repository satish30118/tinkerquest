import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/header.css";
import { useAuth } from "../../contextAPI/authContext";
import { toast } from "react-toastify";
import logo from "../assets/image/logo.webp";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="" />
        </div>
        <div className="navbar-right">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about-us"}>About Us</NavLink>
          <NavLink to={"/test-report"}>Report</NavLink>
          <NavLink to={"/new-test-booking"}>Booking</NavLink>
          {!auth.user ? (
            <NavLink to={"/login"}>Login/Register</NavLink>
          ) : (
            <>
              <NavLink
                to={`/dashboard/${auth?.user?.isAdmin ? "admin" : "user"}`}
              >
                Dashboard
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
