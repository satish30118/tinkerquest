import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteReagent from "./DeleteReagent";
import UpdateReagent from "./UpdateReagent";

const AllReagent = () => {
  const [allReagent, setAllReagent] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [deletePopUp, setdeletePopUp] = useState(false);

  // GETTING ALL REAGENT
  const getAllReagent = async () => {
    try {
      const { data } = await axios.get(`/api/v1/reagent/get-all-reagent`);

      if (data) {
        setAllReagent(data?.reagents);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReagent();
  }, []);

  function printData() {
    var divToPrint = document.getElementById("printReagent");
    let newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }

  return (
    <>
      <div className="tb-user-details">
        <button className="btn" onClick={printData}>
          Print Report
        </button>
        <table style={{ borderCollapse: "collapse" }} id="printReagent">
          <tr>
            <th>Lab Location</th>
            <th>Reagent Name</th>
            <th>In Stock</th>
            <th>Reagent Cost</th>
            <th>Stock Status</th>
            <th>Manage</th>
          </tr>
          {allReagent?.map((item) => (
            <>
              <tr key={item?._id}>
                <td style={{ padding: "9px 0" }}>{item?.city}</td>
                <td>{item?.reagentName}</td>
                <td>
                  {item?.reagentAmount}
                  {item?.reagentUnit}
                </td>
                <td>{item?.reagentCost}</td>
                <td style={{fontWeight:"600",color:`${item?.reagentAmount<10 ? "red" : item?.reagentAmount<50 ? "gold" : "lightgreen"}`}}>{item?.reagentAmount<10 ? "Out of Stock" : item?.reagentAmount<50 ? "Reaching Out of Stock" : "In-Stock"}</td>
                <td>
                  <div>
                    <button
                      className="btn"
                      onClick={(e) => {
                        setSelectedId(item?._id);
                        setUpdatePopUp(true);
                      }}
                    >
                      Update Amount
                    </button>
                    {/* <button
                      className="btn"
                      onClick={(e) => {
                        setSelectedId(item?._id);
                        setdeletePopUp(true);
                      }}
                    >
                      Delete
                    </button> */}
                  </div>
                </td>
              </tr>
            </>
          ))}
        </table>
      </div>

      <div
        style={{
          display: `${deletePopUp ? "block" : "none"}`,
          position: "fixed",
          top: "20%",
          left: "30%",
          textAlign: "center",
        }}
      >
        <DeleteReagent
          id={selectedId}
          setDeletePopUp={setdeletePopUp}
          getTotalBooking={getAllReagent}
        />
      </div>

      <div
        style={{
          display: `${updatePopUp ? "block" : "none"}`,
          position: "fixed",
          top: "10%",
          left: "30%",
          textAlign: "center",
        }}
      >
        <UpdateReagent
          id={selectedId}
          setPopUp={setUpdatePopUp}
          callBack={getAllReagent}
        />
      </div>
    </>
  );
};

export default AllReagent;
