import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Layout from "../../../layout/Layout";
import "./user.css";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState();

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

          <div>{users[0].name}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
