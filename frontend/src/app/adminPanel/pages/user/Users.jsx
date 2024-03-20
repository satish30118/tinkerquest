import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Layout from "../../../layout/Layout";
import "./user.css";
import axios from "axios";
import { useAuth } from "../../../../contextAPI/authContext";
import { toast } from "react-toastify";

const Users = () => {

  const [auth, setAuth] = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [admin, setAdmin] = useState(false);

  /* TOTAL User  */
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

  const handleAdmin = async (e) => {
    e.preventDefault();
    try {
      
      if(selectedId == auth?.user?._id){
        toast.warn("You can't remove yourself")
        return;
      }
      if (admin) {
        const { data } = await axios.put(`/api/v1/auth/update-user/${selectedId}`, {
          status: false,
        });
      } else {
        const { data } = await axios.put(`/api/v1/auth/update-user/${selectedId}`, {
          status: true,
        });
      }
      getTotalUsers();
    } catch (error) {
      console.log(error);
    }
  };

  /* Delete User */
  const deleteUser = async () => {
    try {
      const confirmation = prompt(`You are sure to delete ${selectedId}\n If Yes ? Enter Your Mobile No.`)
      if(confirmation !== auth?.user?.phone){
        return;
      }
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${selectedId}`);

      if (data) {
        toast.success("User Deleted Successfully");
        getTotalUsers();
      }
    } catch (error) {
      console.log(error);
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
                  <th>Mobile No.</th>
                  <th>City</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((u) => (
                  <tr key={u?._id} style={{ padding: "80px 0" }}>
                    <td>{u?._id}</td>
                    <td>{u?.name}</td>
                    <td>{u?.isAdmin ? "Admin" : "Lab Associate"}</td>
                    <td>{u?.phone}</td>
                    <td>{u?.city}</td>
                    <td>
                      <button
                        className="btn"
                        style={{ fontSize: "15px", background:`${u?.isAdmin ? "red" :"blue" }` }}
                        onClick={handleAdmin}
                        onMouseMove={() => {
                          setSelectedId(u?._id);
                          setAdmin(u?.isAdmin);
                        }}
                      >
                        {u?.isAdmin ? "Remove Admin" : "Make Admin"}
                      </button>
                      <button className="btn" onClick={deleteUser} onMouseMove={()=> setSelectedId(u?._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
