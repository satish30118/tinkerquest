import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contextAPI/authContext";
import "./bookingupdate.css";

const BookingUpdate = ({ setEditPopUp, id, setId, getAllBooking }) => {
  const [auth] = useAuth();
  const [updatedData, setUpdatedData] = useState({
    name: "",
    gender: "",
    age: "",
    mobile: "",
    testCategory: "",
    testName: "",
    collectionDate: "",
    status: "",
  });

  /* single BOOKINGs */
  const getSingleBooking = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/booking/get-single-booking/${id}`
      );

      if (data) {
        setUpdatedData(data?.singleBooking);
        // console.log(data.singleBooking);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleBooking();
  }, [id]);

  const handleData = async (e) => {
    e.preventDefault();
    const {
      name,
      gender,
      age,
      mobile,
      testCategory,
      testName,
      collectionDate,
      status,
    } = updatedData;

    try {
      const res = await axios.put(`/api/v1/booking/update-booking/${id}`, {
        name,
        gender,
        age,
        mobile,
        testCategory,
        testName,
        collectionDate,
        status,
      });

      if (res.status == 200) {
        toast.success(res?.data?.message);
        setEditPopUp(false);
        setId = "";
        getAllBooking();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUpdatedData({ ...updatedData, [name]: value });
  };
  return (
    <>
      <form
        style={{
          boxShadow: "0 0 12px 3px",
          padding: "20px",
          background: "lightgray",
        }}
        className="bookig-update-form"
      >
        <span
          style={{
            background: "red",
            color: "white",
            padding: "5px 10px",
            position: "absolute",
            right: "0",
            top: "0",
            cursor: "pointer",
          }}
          onClick={() => setEditPopUp(false)}
        >
          X
        </span>
        <h3>Update Details of {id}</h3>
        <div>
          <input
            type="text"
            name="name"
            id="new-category"
            value={updatedData.name}
            style={{ width: "70%" }}
            onChange={handleChange}
            placeholder="Patient Name"
          />
        </div>
        <div>
          <input
            type="number"
            name="age"
            id="new-category"
            value={updatedData.age}
            style={{ width: "70%" }}
            onChange={handleChange}
            placeholder="Patient Age"
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
          <select
            name="testCategory"
            value={updatedData.testCategory}
            style={{ width: "70%" }}
            onChange={handleChange}
          >
            <option value="">--Select Test--</option>
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
            value={updatedData.testName}
            onChange={handleChange}
            style={{ width: "70%" }}
          >
            <option value="">--- Choose Test ---</option>
            <option value="AIDS">AIDS</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            name="collectionDate"
            value={updatedData.collectionDate}
            style={{ width: "70%" }}
            onChange={handleChange}
          />
        </div>
        <div>
          <select
            name="status"
            value={updatedData.status}
            style={{ width: "70%" }}
            onChange={handleChange}
          >
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
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default BookingUpdate;
