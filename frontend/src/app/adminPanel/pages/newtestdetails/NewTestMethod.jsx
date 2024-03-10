import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import "./newtestmtd.css";

const NewTestMethod = () => {
  const [data, setData] = useState({});
  const [testCategory, setTestCategory] = useState("");
  const [showdetails, setShowDetails] = useState(false);

  const handleChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleData = async (e) => {
    e.preventDefault();
    const { testName, testPrice } = data;
    console.log(testCategory);

    if (!testCategory || !testName || !testPrice) {
      toast.warn("Enter all details");
      return;
    }
    try {
      const { data } = await axios.post(`/api/v1/test/create-test`, {
        testName,
        testCategory,
        testPrice,
      });

      if (data) {
        toast.success(data?.message);
        setData({
          testCategory: "",
          testName: "",
          testPrice: "",
        });
        return;
      }

      toast.error(data?.message);
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
            {/* <h1 className="dashboard-heading">Add New Test Method</h1> */}
          </div>
          <div className="new-test-mtd">
            <form className="crt-test-mtd">
              <div className="footer-page1">
                <div className="both-book1">
                  <h2 style={{ textAlign: "center" }}>
                    Click To Add New Test
                    <span className="em">Method</span>
                  </h2>
                  <div className="frequently-booked1">
                    <div
                      onClick={() => {
                        setTestCategory("thyorid");
                        setShowDetails(true);
                      }}

                      style={{transform:`${testCategory == "thyorid" ? "scale(1.2)" : "scale(1"}`}}
                    >
                      <img
                        src="https://previews.123rf.com/images/alekseyvanin/alekseyvanin2002/alekseyvanin200200985/140976965-thyroid-gland-vector-icon-filled-flat-sign-for-mobile-concept-and-web-design-normal-thyroid-glyph.jpg"
                        alt=""
                      />
                      Thyroid
                    </div>
                    <div
                     onClick={() => {
                      setTestCategory("liver");
                      setShowDetails(true);
                    }}

                    style={{transform:`${testCategory == "liver" ? "scale(1.2)" : "scale(1"}`}}
                    >
                      <img
                        src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160248711/53356021-human-liver.jpg"
                        alt=""
                      />
                      Liver
                    </div>
                    <div
                      onClick={() => {
                        setTestCategory("blood");
                        setShowDetails(true);
                      }}

                      style={{transform:`${testCategory === "blood" ? "scale(1.2)" : "scale(1"}`}}
                    >
                      <img
                        src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160219351/52929157-blood-drop.jpg"
                        alt=""
                      />
                      Blood
                    </div>
                    <div
                     onClick={() => {
                      setTestCategory("diabetes");
                      setShowDetails(true);
                    }}

                    style={{transform:`${testCategory === "diabetes"? "scale(1.2)" : "scale(1"}`}}
                    >
                      <img
                        src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160272837/53282279-syringe.jpg"
                        alt=""
                      />
                      Diabetes
                    </div>
                    <div
                     onClick={() => {
                      setTestCategory("kedney");
                      setShowDetails(true);
                    }}

                    style={{transform:`${testCategory === "kedney" ? "scale(1.2)" : "scale(1"}`}}
                    >
                      <img
                        src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160249174/53361232-human-kidneys.jpg"
                        alt=""
                      />
                      Kindey
                    </div>
                    <div
                      onClick={() => {
                        setTestCategory("vitamin");
                        setShowDetails(true);
                      }}

                      style={{transform:`${testCategory === "vitamin" ? "scale(1.2)" : "scale(1"}`}}
                    >
                      <img
                        src="https://previews.123rf.com/images/captainvector/captainvector1602/captainvector160259044/52931861-medicine-bottle.jpg"
                        alt=""
                      />
                      Vitamin
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mtd-details"
                style={{ display: `${showdetails ? "flex" : "none"}` }}
              >
                <div>
                  <input
                    type="text"
                    name="testName"
                    placeholder="Enter Test Name"
                    value={data.testName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="testPrice"
                    placeholder="Enter Test Price in Rs"
                    value={data.testPrice}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn" onClick={handleData}>
                  Add New Test
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewTestMethod;
