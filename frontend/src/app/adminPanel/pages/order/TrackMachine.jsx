import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TrackMachine = () => {
  const [allMachine, setAllMachine] = useState([]);
  const [selectedId, setSelectedId] = useState("");
 const [orderStatus, setStatus] = useState("");
 const [popUp, setPopUp] =useState(false);

  // GETTING ALL MACHINE
  const getAllMachine = async () => {
    try {
      const { data } = await axios.get(`/api/v1/order/get-order-machine`);

      if (data) {
        setAllMachine(data?.orders);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMachine();
  }, []);


  // UPDATING STATUS
  const updateStatus = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/order/update-order-machine/${selectedId}`, {orderStatus});

      if (data) {
        toast.success("Updated Successfully")
        getAllMachine();
        setPopUp(false)
        setStatus("")
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
          Ordered Machine Tracking
        </h1>
        <table style={{ borderCollapse: "collapse" }}>
          <tr>
            <th>Machine Name</th>
            <th>Ordered Date</th>
            <th>For Test </th>
            <th>Ordered Quantity</th>
            <th>Ordered Cost</th>
            <th>Lab Location</th>
            <th>Ordered Status</th>
            <th>Manage Status</th>
          </tr>
          {allMachine?.map((item) => (
            <>
              <tr key={item?._id}>
                <td>{item?.machineName}</td>
                <td>{item?.createdAt}</td>
                <td>{item?.testName}</td>
                <td>{item?.machineUnitOrder}</td>
                <td>{item?.machineCost * item?.machineUnitOrder}</td>
                <td>{item?.city}</td>
                <td>{item?.orderStatus}</td>
                <td>
                  <button
                    className="btn"
                    style={{ fontSize: "16px" }}
                    onClick={() => {
                      setSelectedId(item?._id);
                      setPopUp(true)
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
      <div className="order-update" style={{display:`${popUp ? "block" :"none"}`}} >
        <div>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">--- Select Order Status ---</option>
            <option value="Ordered">Ordered</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div>
          <button className="btn" style={{background:"blue"}} onClick={updateStatus}>Update Status</button>
          <button className="btn" onClick={()=>setPopUp(false)}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default TrackMachine;
