import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import "./overallInventory.css";
import DeleteAlert from "../popup-form/DeleteAlert";
import BookingUpdate from "../popup-form/BookingUpdate";
import { toast } from "react-toastify";
const TotalBooking = () => {
  const [totalBooking, setTotalBooking] = useState([]);
  const [deletePop, setDeletePop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  /* ALL BOOKINGs */
  const getTotalBooking = async () => {
    try {
      const { data } = await axios.get("/api/v1/booking/get-all-booking");

      if (data) {
        setTotalBooking(data?.allBooking);
        // console.log(data.allBooking);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*CALLING ALL*/
  useEffect(() => {
    getTotalBooking();
  }, []);

  /* UPDATE STATUS*/
  const updateData = async (e) => {
    // e.preventDefault();

    try {
      let res = await axios.put(
        `/api/v1/booking/update-booking/${selectedId}`,
        { status: "completed" }
      );

      if (res?.status == 200) {
        toast.success(res?.data?.message);
        setSelectedId("");
        getTotalBooking();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div
            // className="overlay"
            style={{ display: `${deletePop || editPop ? "block" : "none"}` }}
          ></div>
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">
              User Details - Overall Test Booked
            </h1>
          </div>
          <div className="tb-user-details">
            <table
              // border={"4px solid gray"}
              style={{ borderCollapse: "collapse" }}
            >
              <tr>
                <th>Booking Id</th>
                <th>Booking Date</th>
                <th>Patient Name</th>
                <th>Test Name</th>
                <th>Collection Date</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
              {totalBooking?.map((patient) => (
                <tr>
                  <td>{patient?._id}</td>
                  <td>{patient?.createdAt}</td>
                  <td>{patient?.name}</td>
                  <td>{patient?.testName}</td>
                  <td>{patient?.collectionDate}</td>
                  <td
                    style={{
                      color: `${
                        patient?.status == "completed" ? "lightgreen" : "red"
                      }`,textTransform:"capitalize"
                    }}
                  >
                    {patient?.status}
                  </td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: "blue", fontSize: "12px" }}
                      onClick={updateData}
                      onMouseMove={() => setSelectedId(patient._id)}
                    >
                      Update Status
                    </button>
                    {/* <button
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setDeletePop(true);
                        setSelectedId(patient._id);
                      }}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div
            style={{ display: `${deletePop ? "block" : "none"}` }}
            className="deletePop"
          >
            <DeleteAlert
              id={selectedId}
              setDeletePopUp={setDeletePop}
              getTotalBooking={getTotalBooking}
              setId={setSelectedId}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TotalBooking;
