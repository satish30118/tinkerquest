import React from "react";
import "./fallback.css";
import logo from "../assets/image/logo.webp"

const Fallback = () => {
  return <>
  <div className="fall-back-animation">
    <img src={logo} alt="logo" />
  </div>
  </>;
};

export default Fallback;
