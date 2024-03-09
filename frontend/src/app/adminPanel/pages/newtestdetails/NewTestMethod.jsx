import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import "./newtestmtd.css"

const NewTestMethod = () => {
  const [data, setData] = useState({});

  const handleChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleData = async (e) => {
    e.preventDefault();
    const { testCategory, testName, testPrice } = data;

    if (!testCategory || !testName) {
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
          testPrice:""
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
            <h1 className="dashboard-heading">Add New Test Method</h1>
          </div>
          <div className="new-test-mtd">
            <form action="">
              <div>
                <select
                  name="testCategory"
                  value={data.testCategory}
                  style={{ width: "70%" }}
                  onChange={handleChange}
                >
                  <option value="">--- Select Test Type ---</option>
                  <option value="blood">Blood</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="thyroid">Thyroid</option>
                  <option value="vitamin">Vitamin</option>
                  <option value="liver">Liver</option>
                  <option value="kedney">Kidney</option>
                </select>
              </div>
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
                  type="text"
                  name="testPrice"
                  placeholder="Enter Test Price"
                  value={data.testPrice}
                  onChange={handleChange}
                />
              </div>
              <button className="btn"onClick={handleData}>Add New Test</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewTestMethod;
