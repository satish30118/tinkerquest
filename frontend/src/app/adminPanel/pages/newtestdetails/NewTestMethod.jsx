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
                  <h2 style={{ textAlign: "center", color: "white" }}>
                    Click To Add New Test
                    <span className="em">Method</span>
                  </h2>
                  <div className="frequently-booked1">
                    <div
                      onClick={() => {
                        setTestCategory("thyorid");
                        setShowDetails(true);
                      }}

                      style={{ transform: `${testCategory == "thyorid" ? "scale(1.2)" : "scale(1"}` }}
                    >
                      <img
                        src="https://content.presspage.com/uploads/1483/1920_thyroid-393423.jpg?10000"
                        alt=""
                      />
                      Thyroid

                    </div>
                    <div
                      onClick={() => {
                        setTestCategory("liver");
                        setShowDetails(true);
                      }}

                      style={{ transform: `${testCategory == "liver" ? "scale(1.2)" : "scale(1"}` }}
                    >
                      <img
                        src="https://previews.123rf.com/images/vectorwin/vectorwin2108/vectorwin210800672/173348915-liver-function-test-hepatitis-color-icon-vector-liver-function-test-hepatitis-sign-isolated-symbol.jpg"
                        alt=""
                      />
                      Liver
                    </div>
                    <div
                      onClick={() => {
                        setTestCategory("blood");
                        setShowDetails(true);
                      }}

                      style={{ transform: `${testCategory === "blood" ? "scale(1.2)" : "scale(1"}` }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2522/2522453.png"
                        alt=""
                      />
                      Blood
                    </div>
                    <div
                      onClick={() => {
                        setTestCategory("diabetes");
                        setShowDetails(true);
                      }}

                      style={{ transform: `${testCategory === "diabetes" ? "scale(1.2)" : "scale(1"}` }}
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-sNGAuq8sAouapGOH1k79ysP_twFWwBhBhg&usqp=CAU"
                        alt=""
                      />
                      Diabetes
                    </div>
                    <div
                      onClick={() => {
                        setTestCategory("kedney");
                        setShowDetails(true);
                      }}

                      style={{ transform: `${testCategory === "kedney" ? "scale(1.2)" : "scale(1"}` }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/9851/9851788.png"
                        alt=""
                      />
                      Kindey
                    </div>
                    <div
                      onClick={() => {
                        setTestCategory("vitamin");
                        setShowDetails(true);
                      }}

                      style={{ transform: `${testCategory === "vitamin" ? "scale(1.2)" : "scale(1"}` }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3047/3047613.png"
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
