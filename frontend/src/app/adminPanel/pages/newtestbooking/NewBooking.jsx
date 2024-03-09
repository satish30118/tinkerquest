import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminMenu from "../AdminMenu";
import Layout from "../../../layout/Layout";

const NewBoooking = () => {
  const [data, setData] = useState({});
  const [allTest, setAllTest] = useState([]);
  const [cat, setCat] = useState("");

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
  };

  // GETTING ALL TEST RELETED TO CHOOSEN CATEGORY */
  const getTest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/test/all-test/category-wise/${cat}`);

      if (res?.data) {
        setAllTest(res?.data?.test);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleData = async (e) => {
    e.preventDefault();
    const {
      name,
      gender,
      age,
      mobile,
      testCategory,
      testName,
      city,
      collectionDate,
    } = data;
    if (
      !name ||
      !gender ||
      !age ||
      !mobile ||
      !testCategory ||
      !testName ||
      !city ||
      !collectionDate
    ) {
      toast.warn("Enter all details");
      return;
    }
    try {
      const { data } = await axios.post(`/api/v1/booking/new-booking`, {
        name,
        gender,
        age,
        mobile,
        testCategory,
        testName,
        city,
        collectionDate,
      });

      if (data) {
        toast.success(data?.message);
        setData({
          name: "",
          age: "",
          mobile: "",
          gender: "",
          testCategory: "",
          testName: "",
          city: "",
          collectionDate: "",
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
            <h1 className="dashboard-heading">Overall Inventory Details</h1>
          </div>
          <div className="booking-page">
            <form
              style={{
                // boxShadow: "0 0 12px 3px",
                padding: "20px",
                background: "lightgray",
                borderRadius: "9px",
              }}
              className="bookig-update-form"
            >
              <h1 style={{ color: "red" }}>Book A Test</h1>
              <div>
                <input
                  type="text"
                  name="name"
                  id="new-category"
                  value={data.name}
                  style={{ width: "70%" }}
                  onChange={handleChange}
                  placeholder="Patient Name"
                />
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  style={{ width: "10%", height: "20px" }}
                  onChange={handleChange}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  style={{ width: "10%", height: "20px", marginTop: "10px" }}
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  style={{ width: "10%", height: "20px" }}
                  onChange={handleChange}
                />
                <label htmlFor="other">Other</label>
              </div>

              <div>
                <input
                  type="text"
                  name="age"
                  id="new-category"
                  value={data.age}
                  style={{ width: "70%" }}
                  onChange={handleChange}
                  placeholder="Patient Age"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="mobile"
                  id="new-category"
                  value={data.mobile}
                  style={{ width: "70%" }}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
              </div>

              <div>
                <select
                  name="testCategory"
                  value={data.testCategory}
                  style={{ width: "70%" }}
                  onChange={(e) => {
                    handleChange(e);
                    setCat(e.target.value);
                    getTest(e);
                  }}
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
                <select
                  name="testName"
                  value={data.testName}
                  onChange={handleChange}
                  style={{ width: "70%" }}
                >
                  <option value={data.testName} onChange={handleChange}>
                    --- Choose Test ---
                  </option>
                  {allTest?.map((item) => (
                    <option value={item.testName}>{item.testName}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="city"
                  value={data.city}
                  style={{ width: "70%" }}
                  onChange={handleChange}
                >
                  <option value="">--- Choose City ---</option>
                  <option value="Noida">Noida</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Dehradun">Dehradun</option>
                  <option value="Roorkee">Roorkee</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Kanpur">Kanpur</option>
                  <option value="Pune">Pune</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="Patna">Patna</option>
                </select>
              </div>
              <div>
                <input
                  type="date"
                  name="collectionDate"
                  value={data.collectionDate}
                  style={{ width: "70%" }}
                  onChange={handleChange}
                  placeholder="Choose Date for Test"
                />
              </div>
              <div>
                <select
                  name="status"
                  value={data.status}
                  style={{ width: "70%" }}
                  onChange={handleChange}
                >
                  <option value=""> --- Status ---</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <button
                  className="btn"
                  style={{ background: "blue", width: "70%" }}
                  onClick={handleData}
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewBoooking;
