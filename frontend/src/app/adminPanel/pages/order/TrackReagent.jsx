import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TrackReagent = () => {
  const [allReagent, setAllReagent] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [orderStatus, setStatus] = useState("");
  const [popUp, setPopUp] = useState(false);

  // GETTING ALL MACHINE
  const getAllReagent = async () => {
    try {
      const { data } = await axios.get(`/api/v1/order/get-order-reagent`);

      if (data) {
        setAllReagent(data?.orders);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReagent();
  }, []);


  // UPDATING STATUS
  const updateReagent = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/order/update-order-reagent/${selectedId}`, {orderStatus});

      if (data) {
        toast.success("Updated Successfully")
        getAllReagent();
        setStatus("");
        setPopUp(false)
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="tb-user-details">
        <h1 style={{ color: "white", textAlign: "center", paddingTop: "20px" }}>
          Ordered reagent Tracking
        </h1>
        <table style={{ borderCollapse: "collapse" }}>
          <tr>
            <th>Reagent Name</th>
            <th>Orderd Date</th>
            <th>Ordered Quantity</th>
            <th>Ordered Cost</th>
            <th>Lab Location</th>
            <th>Ordered Status</th>
            <th>Manage Status</th>
          </tr>
          {allReagent?.map((item) => (
            <>
              <tr key={item?._id}>
                <td>{item?.reagentName}</td>
                <td>{item?.createdAt}</td>
                <td>
                  {item?.reagentAmount} {item?.reagentUnit}
                </td>
                <td>{item?.reagentCost}</td>
                <td>{item?.city}</td>
                <td>{item?.orderStatus}</td>
                <td>
                  <button
                    className="btn"
                    style={{ fontSize: "16px" }}
                    onClick={() => {
                      setSelectedId(item?._id);
                      setPopUp(true);
                    }}
                    
                  >
                    update Status
                  </button>
                </td>
              </tr>
            </>
          ))}
        </table>
      </div>
      <div
        className="order-update"
        style={{ display: `${popUp ? "block" : "none"}` }}
      >
        <div>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">--- Select Order Status ---</option>
            <option value="Ordered">Ordered</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div>
          <button className="btn" style={{ background: "blue" }} onClick={updateReagent}>
            Update Status
          </button>
          <button className="btn" onClick={() => setPopUp(false)}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default TrackReagent;
