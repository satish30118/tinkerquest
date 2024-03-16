import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Layout from "../../../layout/Layout";
import "./user.css";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [seletedId, setSelectedId] = useState("")
  /* TOTAL TEST OVERALL */
  const getTotalUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-all-user");

      if (data) {
        setUsers(data?.allUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalUsers();
  }, []);

  const updateData = () => {

  }
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">Manage Users Here</h1>
          </div>
          <div className="tb-user-details">
            <table
              // border={"4px solid gray"}
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>User Name</th>
                  <th>Position</th>
                  <th>City</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>

                <tr >
                  <td>12565</td>
                  <td>Dr. Burnol Kumar</td>
                  <td>Lab Assistant</td>
                  <td>Kolkata</td>
                  <td><button className="btn">Make Admin</button></td>
                  
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Layout >
  );
};

export default Users;
