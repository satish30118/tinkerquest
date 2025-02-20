import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import "./overallInventory.css";
import DeleteAlert from "../popup-form/DeleteAlert";
import BookingUpdate from "../popup-form/BookingUpdate";
const TotalPending = () => {
  const [testPendding, setTestPendding] = useState([]);
  const [deletePop, setDeletePop] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [editPop, setEditPop] = useState(false);
  const [search, setSearch] =useState("")

  /*PENDDIN BOOKINGS*/
  const bookingPendding = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/booking/get-pendding-booking`);

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
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/booking/search-by-name/${search}`);

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
    if(!search)
    bookingPendding();
  }, [search]);

  useEffect (()=>{
    if(search){
    searchPatient ()
    }
    
  }, [search])
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
            <h1 className="dashboard-heading">
             <u> User Details - Overall Test Pending</u>
            </h1>
          </div>
          <div id="search">
            <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search Patient" />
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
              {testPendding?.map((patient) => (
                <tr>
                  <td>{patient?._id}</td>
                  <td>{patient?.createdAt}</td>
                  <td>{patient?.name}</td>
                  <td>{patient?.testName}</td>
                  <td style={{ color: "red",textTransform:'capitalize' }}>{patient?.status}</td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: "blue", fontSize: "15px" }}
                      onClick={(e) => {
                        setEditPop(true);
                        setSelectedId(patient._id);
                      }}
                    >
                     <i class="fa-solid fa-user-pen"></i> Edit
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
      </div>
    </Layout>
  );
};

export default TotalPending;
