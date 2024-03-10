import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/header.css";
import { useAuth } from "../../contextAPI/authContext";
import { toast } from "react-toastify";
import logo from "../assets/image/logo.webp";

export default function Header() {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("userInfo");
    const timer = setTimeout(() => {
      toast.success("Logout Successfully!!");
    }, 100);

    return;
  };

  const handleRedirect = ()=>{
    if(auth?.token){
      navigate("/new-test-booking")
    }else{
      navigate("/login")
    }
  }


  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="" />
        </div>
        <div className="navbar-right">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink  to="/new-test-booking">Book Test</NavLink>
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
      </nav>
    </>
  );
}
