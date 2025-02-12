import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/css/login.css";
import "../assets/css/common.css";
import { toast } from "react-toastify";
import { useAuth } from "../../contextAPI/authContext";
import Layout from "../layout/Layout";
import authimg from "../assets/image/auth-img.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import LoaderSpin from "../Animations/LoaderSpin";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [animation, setAnimation] = useState(false);

  const handdleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.warn("Fill all data!");
        return;
      }
      setAnimation(true);
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
        setAnimation(false);

        navigate(`/dashboard/${!auth?.user?.isAdmin ? "admin" : "user"}`);

        return;
      } else {
        toast.error(res.data.message);
        setAnimation(false);
        return;
      }
    } catch (error) {
      toast.error("Server problem please try again!");
      console.log(error);
      setAnimation(false);
      return;
    }
  };
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <Layout>
        <div className="login-page">
          <div className="auth-img" data-aos="fade-right">
            <img src={authimg} alt="" />
          </div>
          <form className="login-form" data-aos="fade-left">
            <h2 className="auth-heading">
              <u> Sign In</u>
            </h2>

            <div className="auth-row">
              <div className="auth-icon">
                <i
                  class="fa-envelope fa-solid"
                  style={{ color: "lightblue" }}
                ></i>
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
                <i class="fa-lock fa-solid" style={{ color: "lightblue" }}></i>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                autoComplete="off"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="show-pass"
              >
                {showPassword ? (
                  <i class="fa-solid fa-eye"></i>
                ) : (
                  <i class="fa-solid fa-eye-slash"></i>
                )}
              </p>
            </div>

            <div>
              <NavLink
                to={"/forgot-password"}
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  fontFamily: "Poppins",
                  color: "white",
                }}
              >
                Forgot password? -{" "}
                <span style={{ color: "white" }}>
                  <u>Reset here</u>{" "}
                </span>
              </NavLink>
            </div>

            <div>
              <button
                className="btn"
                onClick={handdleLogin}
                style={{ margin: "20px 0", width: "100%" }}
              >
                {animation ? (
                  <LoaderSpin />
                ) : (
                  <span>
                    Login{" "}
                    <i class="fa fa-sign-in" style={{ marginRight: "7px" }}></i>
                  </span>
                )}
              </button>
            </div>

            <div>
              <NavLink
                to={"/register"}
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  fontFamily: "Poppins",
                  color: "white",
                }}
              >
                Not have account? -{" "}
                <span style={{ color: "white" }}>
                  <u>Register</u>
                </span>
              </NavLink>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
