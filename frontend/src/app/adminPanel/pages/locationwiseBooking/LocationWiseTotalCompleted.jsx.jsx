import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import "../overallBooking/overallInventory.css";
import DeleteAlert from "../popup-form/DeleteAlert";
import BookingUpdate from "../popup-form/BookingUpdate";
import { useParams } from "react-router-dom";

const LocationWiseTotalCompleted = () => {
  const [testCompleted, setTestCompleted] = useState([]);
  const [deletePop, setDeletePop] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [editPop, setEditPop] = useState(false);
  const [search, setSearch] = useState("");

  const params = useParams();

  /*BOOKING COMPLETED*/
  const bookingCompleted = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/booking/get-completed-booking/location-wise/${params.city}`
      );

      if (data) {
        setTestCompleted(data?.bookingCompleted);
        console.log(data.bookingCompleted);
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
        setTestCompleted(data?.searchedPatient);
        // console.log(data.allBooking);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*CALLING ALL*/
  useEffect(() => {
    if (!search) bookingCompleted();
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
          <AdminMenu />
        </div>
        <div className="content">
          {/* <div
            className="overlay"
            style={{ display: `${deletePop || editPop ? "block" : "none"}` }}
          ></div> */}
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">
              User Details - Test Completed in {params.city}
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
                <th>Status</th>
                <th>Manage</th>
              </tr>
              {testCompleted?.map((patient) => (
                <tr>
                  <td>{patient?._id}</td>
                  <td>{patient?.createdAt}</td>
                  <td>{patient?.name}</td>
                  <td>{patient?.testName}</td>
                  <td
                    style={{ color: "lightgreen", textTransform: "capitalize" }}
                  >
                    {patient?.status}
                  </td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: "blue" }}
                      onClick={(e) => {
                        setEditPop(true);
                        setSelectedId(patient._id);
                      }}
                    >
                      Update
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
              getTotalBooking={bookingCompleted}
              setId={setSelectedId}
            />
          </div>
          
        </div>
        <div
            style={{ display: `${editPop ? "block" : "none"}` }}
            className="deletePop"
          >
            <BookingUpdate
              id={selectedId}
              setEditPopUp={setEditPop}
              getAllBooking={bookingCompleted}
              setId={setSelectedId}
            />
          </div>
      </div>
    </Layout>
  );
};

export default LocationWiseTotalCompleted;
