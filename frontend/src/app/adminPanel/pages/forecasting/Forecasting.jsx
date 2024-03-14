import React, { useState } from "react";
import "../../admin.css";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import "./forecasting.css"
import OverallCat from "../graphs/OverallCat";

const Forecasting = () => {
  const [index, setIndex] = useState();
  const [data, setData] = useState({})
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
      "TSH 3rd Generation"
    ],
    [
      " Complete Blood Count(CBC)",
      "Erythrocyte Sedimentation Rate(ESR)",
      "Blood Group ABO & Rh Typing",
      "Peripheral Smear / General Blood Picture"
    ],
    [
      "Hepatitis B Surface Antigen (HBsAg), Rapid Card",
      "Rheumatoid Factor (RF), Quantitative",
      "HIV Antibody, Rapid Card",
      "Hepatitis C Antibody (HCV), Rapid Card",
      "VDRL",
      "WIDAL By Slide Agglutination"
    ],
    [
      "Liver Function Test"
    ],
    [
      "Urine Routine and Microscopic Examination"
    ]
  ]

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({...DataTransfer, [name] : value});

    if(name === "city"){
      if (value === "BC") setIndex(0)
      if (value === "HM") setIndex(1)
      if (value === "SE") setIndex(2)
      if (value === "PL") setIndex(3)
      if (value === "CP") setIndex(4)
    }
  }

  const handleData = () =>{

  }
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading"><u>Forecasting Details</u></h1>
          </div>
          <div className="forecast-form-page">
            <form action="" className="forecast-form">
              <div>
                <select name="city" id="" onChange={handleChange} >
                  <option value="" > --Choose City--</option>
                  <option value="BC"  >BC</option>
                  <option value="HM" >HM</option>
                  <option value="SE"  >SE</option>
                  <option value="PL"  >PL</option>
                  <option value="CP" >CP</option>
                </select>
              </div>

              <div>
                <select name="testName" id="" onChange={handleChange} >
                  <option value="">--Choose Test--</option>
                  {test[index].map((item)=>(
                      <option value={item}>{item}</option>
                  ))}
                  
                </select>
              </div>
              <div>
                <label>Choose intial date</label>
                <input type="date" name="startDate" id=""  onChange={handleChange} />
              </div>
              <div>
                <label>Choose final date</label>
                <input type="date" name="finalDate" onChange={handleChange} />
              </div>
              <div>
                <button className="btn" onClick={handleData}>
                  Forecast
                </button>

              </div>


            </form>
            <div className="forecast-result">
              <OverallCat/>
            </div>
          </div>


        </div>
      </div>
    </Layout>
  );
};

export default Forecasting;
