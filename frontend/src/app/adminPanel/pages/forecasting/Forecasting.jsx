import React, { useState } from "react";
import "../../admin.css";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import "./forecasting.css";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderSpin from "../../../Animations/LoaderSpin";
import LineGraph from "../graphs/LineGraph";

const Forecasting = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState({});
  const [animation, setAnimation] = useState(false);
  let dataPredicted = [10, 4, 20, 7, 8, 2, 17, 14, 3, 21];
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
    const { city, day, testName } = data;
    if (!city || !day || !testName) {
      toast.warn("Fill all Filed");
      return;
    }

    try {
      setAnimation(true);
      const { data } = await axios.post(`/api/v1/predict`, { city, day });
      if (data) {
        dataPredicted = data?.prediction;
      }

      setAnimation(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
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
                <label>How many day ? </label>
                <input
                  type="number"
                  name="day"
                  value={data.day}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button
                  className="btn"
                  style={{ width: "40%", textAlign: "center" }}
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
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                padding: "20px",
              }}
            >
              <div
                style={{
                  background: "white",
                  margin: "30px 0",
                  width: "500px",
                  padding: "10px",
                }}
              >
                <h2 style={{ textAlign: "center" }}>
                  Predicted Booking in {data?.day} days
                </h2>
                <LineGraph d={dataPredicted} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forecasting;
