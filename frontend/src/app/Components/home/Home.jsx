import React from "react";
import Layout from "../../layout/Layout";
import "./home.css";
import { useAuth } from "../../../contextAPI/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import himg from '../../assets/image/bg.jpg'

const Home = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (auth?.token) {
      navigate("/dashboard/admin");
    } else {
      setTimeout(() => {
        toast.warn("You have not login, please login to see dashboard");
      }, 1000);
      navigate("/login");
    }
  };

  return (
    <Layout>
      <div className="home-page">
        <div className="h-bg">
          <img
            src="https://st5.depositphotos.com/69155792/65428/i/450/depositphotos_654288820-stock-photo-health-care-concept-icons-health.jpg"
            alt=""
          />
        </div>

        <div className="h-text">
          <h2 style={{ fontFamily: "Poppins" }}>
            <p className="em">EMPOWERING</p>
            PEOPLE TO IMPROVE THEIR LIVES
          </h2>
          <div className="contact-details">
            <h2 id="book-now" onClick={handleRedirect}>
              Go to Dashboard <i class="fa-solid fa-arrow-right"></i>
            </h2>
          </div>
        </div>
      </div>
      <div className="footer-page1">
        <div className="both-book1">
          <h2 >
            <u style={{color:"white"}}>Frequently</u>
            <span className="em"><u>Booked</u></span>
          </h2>
          <div className="frequently-booked1">
            <div>
              <img
                src="https://previews.123rf.com/images/alekseyvanin/alekseyvanin2002/alekseyvanin200200985/140976965-thyroid-gland-vector-icon-filled-flat-sign-for-mobile-concept-and-web-design-normal-thyroid-glyph.jpg"
                alt=""
              />
              Thyroid
            </div>
            <div>
              <img
                src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160248711/53356021-human-liver.jpg"
                alt=""
              />
              Liver
            </div>
            <div>
              <img
                src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160219351/52929157-blood-drop.jpg"
                alt=""
              />
              Blood
            </div>
            <div>
              <img
                src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160272837/53282279-syringe.jpg"
                alt=""
              />
              Diabetes
            </div>
            <div>
              <img
                src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160249174/53361232-human-kidneys.jpg"
                alt=""
              />
              Kindey
            </div>
            <div>
              <img
                src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160259044/52931861-medicine-bottle.jpg"
                alt=""
              />
              Vitamin
            </div>
          </div>
        </div>
      </div>
      <div className="footer-page2">
        <div className="both-book2">
          <h2 >
            <u style={{color:"white"}}>Our</u>
            <span className="em"><u>Features</u></span>
          </h2>
          <div className="frequently-booked2">
            <div>
              <img
                src="https://previews.123rf.com/images/captainvector/captainvector1601/captainvector160114572/51894216-graphic-design-of-bar-chart-on-projection-screen.jpg"
                alt=""
              />
              Inverntory Demand Forecasting
            </div>
            <div>
              <img
                src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160260623/52973306-letter-m.jpg"
                alt=""
              />
              Effective Inventory Management System
            </div>
            <div>
              <img
                src="https://previews.123rf.com/images/luka007/luka0071505/luka007150500058/39573454-target-icon.jpg"
                alt=""
              />
              Accurate Prediction of Stockout
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
