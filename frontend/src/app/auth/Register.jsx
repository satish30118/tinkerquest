import React, { useState } from "react";
import "../assets/css/register.css";
import "../assets/css/common.css";
import { NavLink } from "react-router-dom";
import {toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../contextAPI/authContext";
import Layout from "../layout/Layout";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitBtn, setSubmitBtn] = useState({ text: "Submit", bg: "Green" });
  const [auth, setAuth] = useAuth();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    answer: "",
  });

  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword, phone, answer } = data;

    if (!name || !email || !password || !cpassword || !phone || !answer) {
      toast.warn("Fill all data!!");
      return;
    }

    if (password !== cpassword) {
      toast.warn("Password and Confirm password are not same");
      return;
    }

    setSubmitBtn({ text: "Submitting...", bg: "lightgreen" });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, answer }
      );

      //SET USER DATA IN GLOBAL OBJECT(AUTH CONTEXT)
      setAuth({
        ...auth,
        user: res.data.userDetails,
        token: res.data.token,
      });

      localStorage.setItem("userInfo", JSON.stringify(res.data));

      if (res.status === 201) {
        setSubmitBtn({ text: "Submitted", bg: "green" });
        toast.success(res.data.message);
        return;

        //Forward to dashboard
      } else {
        toast.error(res.data.message);
        return;
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <>
      <Layout>
        <div className="register-page">
          <form className="register-form">
            <h2 className="auth-heading">Register</h2>

            <div className="auth-row">
              <div className="auth-icon">
                <i class="fa-user fa-solid"></i>
              </div>
              <input
                type="text"
                id="register-name"
                autoComplete="off"
                placeholder="Name"
                name="name"
                onChange={handleData}
                value={data.name}
              />
            </div>

            <div className="auth-row">
              <div className="auth-icon">
                <i class="fa-envelope fa-solid"></i>
              </div>
              <input
                type="email"
                id="register-email"
                autoComplete="off"
                placeholder="Email"
                name="email"
                onChange={handleData}
                value={data.email}
              />
            </div>

            <div className="auth-row">
              <div className="auth-icon">
                <i class="fa-lock fa-solid"></i>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="register-password"
                autoComplete="off"
                placeholder="Password"
                name="password"
                onChange={handleData}
                value={data.password}
              />
            </div>

            <div className="auth-row">
              <div className="auth-icon">
                <i class="fa-lock fa-solid"></i>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="register-password"
                autoComplete="off"
                placeholder=" Confirm Password"
                name="cpassword"
                onChange={handleData}
                value={data.cpassword}
              />
            </div>

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="show-pass"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </div>

            <div className="auth-row">
              <div className="auth-icon">
                <i class="fa-phone fa-solid"></i>
              </div>
              <input
                type="text"
                id="register-phone"
                autoComplete="off"
                placeholder="Phone"
                name="phone"
                onChange={handleData}
                value={data.phone}
              />
            </div>
            <div className="auth-row">
              <div className="auth-icon">
                <i class="fa-location fa-solid"></i>
              </div>
              <input
                type="text"
                id="register-address"
                autoComplete="off"
                placeholder="Your First School Name?"
                name="answer"
                onChange={handleData}
                value={data.answer}
              />
            </div>

            <div>
              <button className="btn" onClick={sendData}>
                {" "}
                <i class="fa fa-sign-in" style={{ marginRight: "7px" }}></i>
                Register
              </button>
            </div>

            <div>
              <NavLink
                to={"/login"}
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  fontFamily: "georgia",
                }}
              >
                Already have account -{" "}
                <span style={{ color: "red" }}>Login</span>
              </NavLink>
            </div>
          </form>
        </div>
        
      </Layout>
    </>
  );
}
