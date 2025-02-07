import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/login.css";
import "../../assets/css/common.css";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import { NavLink } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import LoaderSpin from "../../Animations/LoaderSpin";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [animation, setAnimation] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  const handdleData = async (e) => {
    e.preventDefault();
    try {
      if (!email || !newPassword || !answer) {
        toast.warn("Fill all data!");
        return;
      }
      setAnimation(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      console.log(res);
      const success = await res.data.success;
      setAnimation(false);

      if (res.status === 200) {
        toast.success("Passwod Reset Successfully!!");
        return;
      } else {
        toast.error(res.data.message);
        return;
      }
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      console.log(error);
      setAnimation(false);
      return;
    }
  };
  return (
    <>
      <Layout>
        <div className="login-page">
          <form className="login-form" data-aos="fade-left">
            <h2 className="auth-heading">Rest Your Password</h2>

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
                autoComplete="off"
                placeholder="Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
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
                <i class="fa-envelope fa-solid"></i>
              </div>
              <input
                type="text"
                id="login-email"
                autoComplete="off"
                placeholder="Your First College Name?"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </div>

            <div>
              <button
                className="btn"
                onClick={handdleData}
                style={{ marginTop: "8px" }}
              >
                {animation ? (
                  <LoaderSpin />
                ) : (
                  <span>
                    <i
                      class="fa fa-power-off"
                      style={{ marginRight: "7px" }}
                    ></i>
                    Reset Password
                  </span>
                )}
              </button>
            </div>

            <div>
              <NavLink
                to={"/login"}
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  fontFamily: "georgia",
                  color: "white",
                }}
              >
                Go to Login Page -{" "}
                <span style={{ color: "red" }}>Click Here</span>
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
