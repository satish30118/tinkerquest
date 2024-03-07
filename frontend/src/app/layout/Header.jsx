import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/header.css";
import { useAuth } from "../../contextAPI/authContext";
import { toast } from "react-toastify";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

 

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <p>Modive</p>
        </div>
        <div className="navbar-right">
          
          <NavLink to={"/"}>Home</NavLink>
          {!auth.user ? (
            <NavLink to={"/login"}>Login/Register</NavLink>
          ) : (
            <>
            <NavLink to={`/dashboard/${auth?.user?.isAdmin ? "admin": "user"}`} >Dashboard</NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
