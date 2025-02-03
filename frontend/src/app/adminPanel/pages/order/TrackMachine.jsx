import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TrackMachine = () => {
  const [allMachine, setAllMachine] = useState([]);
  const [singleMachine, setSingleMachine] = useState();
  const [selectedId, setSelectedId] = useState("");
  const [orderStatus, setStatus] = useState("");
  const [popUp, setPopUp] = useState(false);

  // GETTING ALL MACHINE
  const getAllMachine = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order/get-order-machine`);

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

  // GETTING SINGLE MACHINE
  const getSingleMachine = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/order/get-single-machine/${selectedId}`
      );

      if (data) {
        setSingleMachine(data?.singleOrder);
        console.log(singleMachine);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedId) getSingleMachine();
  }, [selectedId]);

  // UPDATING STATUS
  const updateStatus = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/order/update-order-machine/${selectedId}`,
        { orderStatus }
      );

      if (data) {
        toast.success("Updated Successfully");
        setStatus("");
        setPopUp(false);
        getAllMachine();
      }

      // UPDATING MACHINE IN STOCK DETAILS //
      if (orderStatus === "Delivered") {
        const {
          city,
          machineName,
          machineUnitOrder,
          machineCost,
          testLimit,
          testCategory,
          testName,
          reagent,
        } = singleMachine;

        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/machine/create-machine`, {
          city,
          machineName,
          machineStock: machineUnitOrder,
          machineCost,
          testLimit,
          testCategory,
          testName,
          reagent,
        });
        if (res?.status == 200) {
          const { data } = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/machine//update-machine/${res?.data?.machineExist?._id}`,
            {
              machineStock:
                machineUnitOrder + res?.data?.machineExist?.machineStock,
                machineCost: machineCost + res?.data?.machineExist?.machineCost
            }
          );
        }
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
            <th>Lab Location</th>
            <th>Machine Name</th>
            <th>Ordered Date</th>
            <th>For Test </th>
            <th>Ordered Quantity</th>
            <th>Ordered Cost</th>
            <th>Ordered Status</th>
            <th>Manage Status</th>
          </tr>
          {allMachine?.map((item) => (
            <>
              <tr key={item?._id}>
                <td>{item?.city}</td>
                <td>{item?.machineName}</td>
                <td>{item?.createdAt}</td>
                <td>{item?.testName}</td>
                <td>{item?.machineUnitOrder}</td>
                <td>{item?.machineCost}</td>
                <td>{item?.orderStatus}</td>
                <td id="th-manage">
                  <button
                    className="btn"
                    style={{ fontSize: "16px", display:`${item?.orderStatus == "Delivered" ? "none" :"inline"}` }}
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
          <select
            onChange={(e) => setStatus(e.target.value)}
            value={orderStatus}
          >
            <option value="">--- Select Order Status ---</option>
            <option value="Ordered">Ordered</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div>
          <button
            className="btn"
            style={{ background: "blue" }}
            onClick={updateStatus}
          >
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

export default TrackMachine;
