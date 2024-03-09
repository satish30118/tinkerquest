import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import "../overallInventory/overallInventory.css";
import DeleteAlert from "../popup-form/DeleteAlert";
import BookingUpdate from "../popup-form/BookingUpdate";
import { useParams } from "react-router-dom";

const LocationWiseTotalBooking = () => {
  const [totalBooking, setTotalBooking] = useState([]);
  const [deletePop, setDeletePop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  /* ALL BOOKINGs */
  const params = useParams();

  const getTotalBooking = async () => {
    try {
      const { data } = await axios.get(`/api/v1/booking/get-all-booking/location-wise/${params.city}`);

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
          <div
            className="overlay"
            style={{ display: `${deletePop || editPop ? "block" : "none"}` }}
          ></div>
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">User Details - Test Booked</h1>
          </div>
          <div className="tb-user-details">
            <table
              border={"4px solid gray"}
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
                  <td>{patient?.status}</td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: "green" }}
                      onClick={(e) => {
                        setEditPop(true);
                        setSelectedId(patient._id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setDeletePop(true);
                        setSelectedId(patient._id);
                      }}
                    >
                      Delete
                    </button>
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
          <div
            style={{ display: `${editPop ? "block" : "none"}` }}
            className="deletePop"
          >
            <BookingUpdate
              id={selectedId}
              setEditPopUp={setEditPop}
              getAllBooking={getTotalBooking}
              setId={setSelectedId}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LocationWiseTotalBooking;