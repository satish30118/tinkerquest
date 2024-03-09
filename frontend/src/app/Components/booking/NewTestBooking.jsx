import Layout from "../../layout/Layout";
import React, { useState } from "react";
import "./booking.css";
import { toast } from "react-toastify";
import axios from "axios";

const NewTestBoooking = () => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
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
      <div className="booking-page">
        <form
          style={{
            boxShadow: "0 0 12px 3px",
            padding: "20px",
            background: "lightgray",
          }}
          className="bookig-update-form"
        >
          <h1>Book A Test</h1>
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
              style={{ width: "10%" }}
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              style={{ width: "10%" }}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="other"
              value="other"
              style={{ width: "10%" }}
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
              onChange={handleChange}
            >
              <option value="">-- Select Test Category --</option>
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
              <option value="">--- Choose Test Type ---</option>
              <option value="AIDS">AIDS</option>
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
    </Layout>
  );
};

export default NewTestBoooking;
