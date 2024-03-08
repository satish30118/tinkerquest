import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import "./overallInventory.css"
const TotalBooking = () => {
  const [totalBooking, setTotalBooking] = useState([]);

  /* ALL BOOKINGs */
  const getTotalBooking = async () => {
    try {
      const { data } = await axios.get("/api/v1/booking/get-all-booking");

      if (data) {
        setTotalBooking(data?.allBooking);
        console.log(data.allBooking);
      }
    } catch (error) {
      console.log(error);
    }
  };

   /*CALLING ALL*/
   useEffect(() => {
    getTotalBooking();
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
                <th>Booking Date</th>
                <th>Patient Name</th>
                <th>Test Name</th>
                <th>Collection Date</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
              {totalBooking?.map((patient)=>(
                <tr>
                    <td>{patient?._id}</td>
                    <td>{patient?.timeStamps}</td>
                    <td>{patient?.testCategory}</td>
                    <td>{patient?.testName}</td>
                    <td>{patient?.date}</td>
                    <td>{patient?.status}</td>
                    <td><button className="btn" style={{background:"green"}}>Update</button>
                    <button className="btn">Delete</button></td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TotalBooking;
