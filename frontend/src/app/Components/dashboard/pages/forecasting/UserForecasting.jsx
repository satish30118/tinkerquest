import React, { useState } from "react";
import "./forecasting.css";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderSpin from "../../../../Animations/LoaderSpin";
import LineChart from "../graphs/LineChart";
import UserMenu from "../../UserMenu";
import Layout from "../../../../layout/Layout";

const UserForecasting = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState({});
  const [animation, setAnimation] = useState(false);
  const [showgraph, setShowgraph] = useState(false);
  const [dataPredicted, setDataPredicted] =useState([12,23,56,35,56,])
  
  const test = [
    [
      "Lipid Profile",
      "Glucose Fasting(BSF)",
      "HbA1C(Glycosylated Haemoglobin)",
      "Thyroid Profile Total",
      "Kidney Function Test(KFT)",
      "Vitamin D 25 Hydroxy",
      "Vitamin B12 / Cyanocobalamin",
      "Iron Studies",
      "Creatinine",
      "TSH 3rd Generation",
    ],
    [
      " Complete Blood Count(CBC)",
      "Erythrocyte Sedimentation Rate(ESR)",
      "Blood Group ABO & Rh Typing",
      "Peripheral Smear / General Blood Picture",
    ],
    [
      "Hepatitis B Surface Antigen (HBsAg), Rapid Card",
      "Rheumatoid Factor (RF), Quantitative",
      "HIV Antibody, Rapid Card",
      "Hepatitis C Antibody (HCV), Rapid Card",
      "VDRL",
      "WIDAL By Slide Agglutination",
    ],
    ["Liver Function Test"],
    ["Urine Routine and Microscopic Examination"],
  ];

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });

    if (name === "city") {
      if (value === "BC" || value === "overall") setIndex(0);
      if (value === "HM") setIndex(1);
      if (value === "SE") setIndex(2);
      if (value === "PL") setIndex(3);
      if (value === "CP") setIndex(4);
    }
  };

  /* PREDICTING BOOKING */
  const predict = async (e) => {
    e.preventDefault();
    const { city,  testName } = data;
    if (!city|| !testName) {
      toast.warn("Fill all Filed");
      return;
    }

    try {
      setAnimation(true);
      const { data } = await axios.post(`/api/v1/predict`, { city:"BC", day : 20 });
      if (data) {
        setDataPredicted( data?.prediction);
        console.log(data?.prediction)
        
      }

      setAnimation(false);
      setShowgraph(true)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <UserMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">
              <u>Forecasting Details</u>
            </h1>
          </div>
          <div className="forecast-form-page">
            <form className="forecast-form">
              <div>
                <select name="city" value={data.city} onChange={handleChange}>
                  <option value=""> --Choose City--</option>
                  <option value="overall">Overall</option>
                  <option value="BC">Roorkee</option>
                  <option value="HM">Delhi</option>
                  <option value="SE">Mumbai</option>
                  <option value="PL">Kolkata</option>
                  <option value="CP">Patna</option>
                </select>
              </div>

              <div>
                <select
                  name="testName"
                  value={data.testName}
                  onChange={handleChange}
                >
                  <option value="">--Choose Test--</option>
                  {test[index].map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input type="Number" name="day" value={data.day} />
              </div>

              <div>
                <button
                  className="btn"
                  style={{ width: "auto",padding:"9px 40px ", textAlign: "center" }}
                  onClick={predict}
                >
                  {animation ? (
                    <div style={{ width: "100%" }}>
                      <LoaderSpin />
                    </div>
                  ) : (
                    "Forecast"
                  )}
                </button>
              </div>
            </form>

            <div
              className="graph"
              style={{
                padding: "20px",
                display:`${showgraph ? "block" :"none"}`
              }}
            >
              <div
                style={{
                  background: "white",
                  margin: "30px 0",
                  width: "100%",
                  padding: "10px",
                }}
              >
                <h2 style={{ textAlign: "center" }}>
                  Predicted Booking in {data?.day} days
                </h2>
                <LineChart d={dataPredicted} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserForecasting;
