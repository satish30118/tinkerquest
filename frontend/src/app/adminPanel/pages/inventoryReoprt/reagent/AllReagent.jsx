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

  return (
    <>
      <div className="tb-user-details">
        <table style={{ borderCollapse: "collapse" }}>
          <tr>
            <th>City</th>
            <th>Reagent Name</th>
            <th>In Stock</th>
            <th>Reagent Cost</th>
            <th>Stock Status</th>
            <th>Manage</th>
          </tr>
          {allReagent?.map((item) => (
            <>
              <tr key={item?._id}>
                <td>{item?.city}</td>
                <td>{item?.reagentName}</td>
                <td>
                  {item?.reagentAmount}
                  {item?.reagentUnit}
                </td>
                <td>{item?.reagentCost}</td>
                <td>Stock Status</td>
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
                    <button
                      className="btn"
                      onClick={(e) => {
                        setSelectedId(item?._id);
                        setdeletePopUp(true);
                      }}
                    >
                      Delete
                    </button>
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