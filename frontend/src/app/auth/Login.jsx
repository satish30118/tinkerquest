import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/css/login.css";
import "../assets/css/common.css";
import {toast } from "react-toastify";
import { useAuth } from "../../contextAPI/authContext";
import Layout from "../layout/Layout";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const handdleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.warn("Fill all data!");
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );


      if (res.status === 201) {
        setTimeout(() => {
          toast.success("Login Successfully!!"); 
        }, 100);
        
        
      //SET USER DATA IN GLOBAL OBJECT(AUTH CONTEXT)
      setAuth({
        ...auth,
        user: res.data.userDetails,
        token: res.data.token,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.data));

          navigate( `/` || location.state)
        return;

      } else {
        toast.error(res.data.message);
        return;
      }
    } catch (error) {
      toast.error("Server problem please try again!");
      console.log(error);
      return;
    }
  };
  return (
    <>
      <Layout>
        <div className="login-page">
          <form className="login-form">
            <h2 className="auth-heading">Login Yourself</h2>

            <div className="auth-row">
              <div className="auth-icon">
                <i class="fa-envelope fa-solid"></i>
              </div>
              <input
                type="email"
                id="login-email"
                autoComplete="off"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="auth-row">
              <div className="auth-icon">
                <i class="fa-lock fa-solid"></i>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                autoComplete="off"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="show-pass"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </div>
            <div>
              <NavLink
                to={"/forgot-password"}
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  fontFamily: "georgia",
                  
                }}
              >
                Forgot your password? -{" "}
                <span style={{ color: "red" }}>Reset here</span>
              </NavLink>
            </div>

            <div>
              <button className="btn" onClick={handdleLogin} style={{marginTop:"9px", width:"100%"}}>
                {" "}
                <i class="fa fa-sign-in" style={{ marginRight: "7px"}}></i>
                Login
              </button>
            </div>

            <div>
              <NavLink
                to={"/register"}
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  fontFamily: "georgia",
                }}
              >
                Not have account -{" "}
                <span style={{ color: "red" }}>Register</span>
              </NavLink>
            </div>
          </form>
        </div>
        
      </Layout>
    </>
  );
}
