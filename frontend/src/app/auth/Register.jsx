import React, { useEffect, useState } from "react";
import "../assets/css/register.css";
import "../assets/css/common.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../contextAPI/authContext";
import Layout from "../layout/Layout";
import Aos from "aos";
import "aos/dist/aos.css";
import LoaderSpin from "../Animations/LoaderSpin";

export default function Register() {
  const [auth, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [otpPopUp, setOtpPopUp] = useState(false);
  const [otp, setOtp] = useState();
  const [data, setData] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    cpassword: "",
    phone: "",
    answer: "",
  });

  const navigate = useNavigate();

  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const { name, email, city, password, cpassword, phone, answer } = data;

      if (
        !name ||
        !email ||
        !city ||
        !password ||
        !cpassword ||
        !phone ||
        !answer
      ) {
        toast.warn("Fill all data!!");
        return;
      }

      if (password !== cpassword) {
        toast.warn("Password and Confirm password are not same");
        return;
      }
      setAnimation(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/send-otp`,
        { email }
      );
      setAnimation(false);

      if (res?.status == 200) {
        setOtpPopUp(true);
        toast.success("OTP successfully send, please check your email");
      } else {
        toast.success("OTP can't send, please check your email id");
      }
    } catch (error) {
      console.log(error);
      setAnimation(false);
      toast.error("Something went wrong, please try again");
    }
  };

  const sendData = async (e) => {
    e.preventDefault();

    const { name, email, city, password, cpassword, phone, answer } = data;

    if (
      !name ||
      !email ||
      !city ||
      !password ||
      !cpassword ||
      !phone ||
      !answer
    ) {
      toast.warn("Fill all data!!");
      return;
    }

    if (password !== cpassword) {
      toast.warn("Password and Confirm password are not same");
      return;
    }

    try {

      const emailRes = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/verify-otp`,
        { otp }
      );

      if (!emailRes?.data?.success) {
        toast.error("Invalid OTP");
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, city, password, phone, answer }
      );

      //SET USER DATA IN GLOBAL OBJECT(AUTH CONTEXT)
      setAuth({
        ...auth,
        user: res.data.userDetails,
        token: res.data.token,
      });

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      if (res.status === 201) {
        toast.success(res.data.message);
        //Forward to dashboard
        navigate(`/dashboard/${auth?.user?.isAdmin ? "admin" : "user"}`);
        return;
      } else {
        toast.error(res.data.message);
        return;
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);

  return (
    <>
      <Layout>
        <div className="register-page">
          <form className="register-form" data-aos="fade-left">
            <h2 className="auth-heading">
              <u>Register</u>
            </h2>
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
                required
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
                required
                onChange={handleData}
                value={data.email}
              />
            </div>

            <div className="auth-row">
              <select
                name="city"
                onChange={handleData}
                value={data.city}
                required
                style={{ color: "white" }}
              >
                <option value="">--- Choose lab Location ---</option>
                <option value="Noida">Noida</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Dehradun">Dehradun</option>
                <option value="Roorkee">Roorkee</option>
                <option value="Kolkata">Kolkata </option>
                <option value="Pune">Pune</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Patna">Patna</option>
              </select>
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
                required
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
                id="register-cpassword"
                autoComplete="off"
                placeholder=" Confirm Password"
                name="cpassword"
                required
                onChange={handleData}
                value={data.cpassword}
              />
            </div>
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="show-pass"
              style={{width:"300px", textAlign:"left"}}
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
                required
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
              {otpPopUp ? (
                <div
                  className="email-verification"
                  style={{ background: "white" }}
                >
                  <div>
                    <label htmlFor="email-otp">Enter OTP</label>
                    <input
                      type="number"
                      id="email-otp"
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                    />
                  </div>
                  <div>
                    <button className="btn" onClick={sendData}>
                      Verify
                    </button>
                    <button className="btn" onClick={sendOTP}>
                    {animation ? <LoaderSpin /> : "Re-send"}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn"
                  style={{ width: "100%" }}
                  onClick={sendOTP}
                >
                  {animation ? (
                    <LoaderSpin />
                  ) : (
                    <span>
                      <i
                        class="fa fa-sign-in"
                        style={{ marginRight: "7px" }}
                      ></i>
                      Register
                    </span>
                  )}
                </button>
              )}
            </div>
            {/* OTP FIELD */}

            <div>
              <NavLink
                to={"/login"}
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  fontFamily: "Poppins",
                  color: "white",
                }}
              >
                Already have account -{" "}
                <span style={{ color: "red" }}>Login</span>
              </NavLink>
            </div>
          </form>
          <div
            className="auth-img"
            style={{ width: "60%" }}
            data-aos="fade-right"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/002/127/145/original/pharmacy-concept-illustration-research-lab-service-independent-medical-lab-service-medical-laboratory-health-test-character-cartoon-illustration-flat-style-free-vector.jpg"
              alt=""
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
