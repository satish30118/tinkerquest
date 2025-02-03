import React, { useEffect, useState } from "react";
import axios from "axios";
import "./overallbooking.css";
import DeleteAlert from "../popup-form/DeleteAlert";
import BookingUpdate from "../popup-form/BookingUpdate";
import { useParams } from "react-router-dom";
import UserMenu from "../../UserMenu";
import Layout from "../../../../layout/Layout";
const UserTestPending = () => {
  const [testPendding, setTestPendding] = useState([]);
  const [deletePop, setDeletePop] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [editPop, setEditPop] = useState(false);
  const [search, setSearch] = useState("");

  const params = useParams();

  /*PENDDIN BOOKINGS*/
  const bookingPendding = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/booking/get-pendding-booking/location-wise/${params.city}`
      );

      if (data) {
        setTestPendding(data?.bookingPendding);
        console.log(data.bookingPendding);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* SEARCH PATIENT BY NAME */
  const searchPatient = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/booking/search-by-name/${search}`
      );

      if (data) {
        setTestPendding(data?.searchedPatient);
        // console.log(data.allBooking);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*CALLING ALL*/
  useEffect(() => {
    if (!search) bookingPendding();
  }, [search]);

  useEffect(() => {
    if (search) {
      searchPatient();
    }
  }, [search]);
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <UserMenu />
        </div>
        <div className="content">
          <div
            className="overlay"
            style={{ display: `${deletePop || editPop ? "block" : "none"}` }}
          ></div>
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">
              <u>User Details - Test Pending in {params.city}</u>
            </h1>
          </div>
          <div id="search">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter Patient Name"
            />
            {/* <button onClick={searchPatient}>Search</button> */}
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
              {testPendding?.map((patient) => (
                <tr>
                  <td>{patient?._id}</td>
                  <td>{patient?.createdAt}</td>
                  <td>{patient?.name}</td>
                  <td>{patient?.testName}</td>
                  <td>{patient?.collectionDate}</td>
                  <td style={{ color: "red", textTransform: "capitalize" }}>
                    {patient?.status}
                  </td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: "blue", fontSize: "15px" }}
                      onClick={(e) => {
                        setEditPop(true);
                        setSelectedId(patient._id);
                      }}
                    >
                      <i class="fa-solid fa-pen-to-square"></i> Update
                    </button>
                    {/* <button
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setDeletePop(true);
                        setSelectedId(patient?._id);
                      }}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div
          style={{ display: `${deletePop ? "block" : "none"}` }}
          className="deletePop"
        >
          <DeleteAlert
            id={selectedId}
            setDeletePopUp={setDeletePop}
            getTotalBooking={bookingPendding}
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
            getAllBooking={bookingPendding}
            setId={setSelectedId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default UserTestPending;
