import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import "./overallInventory.css"
const TotalCompleted = () => {
    const [testCompleted, setTestCompleted] = useState([]);

   /*BOOKING COMPLETED*/
   const bookingCompleted = async () => {
    try {
      const { data } = await axios.get("/api/v1/booking/get-completed-booking");

      if (data) {
        setTestCompleted(data?.bookingCompleted);
        console.log(data.bookingCompleted);
      }
    } catch (error) {
      console.log(error);
    }
  };

   /*CALLING ALL*/
   useEffect(() => {
    bookingCompleted();
  }, []);
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">User Details - Test Booked</h1>
          </div>
          <div className="tb-user-details">
            <table border={"4px solid gray"} style={{borderCollapse:"collapse"}}>
              <tr>
                <th>Booking Id</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Date for Test</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
              {testCompleted?.map((patient)=>(
                <tr>
                    <td>{patient?._id}</td>
                    <td>{patient?.name}</td>
                    <td>{patient?.age}</td>
                    <td>{patient?.gender}</td>
                    <td>{patient?.date}</td>
                    <td>{patient?.status}</td>
                    <td><button className="btn" style={{background:"green"}}>Update</button></td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TotalCompleted;
