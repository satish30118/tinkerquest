import axios from "axios";
import React, { useEffect, useState } from "react";
import "./machine.css"

const AllMachine = () => {
  const [allMachine, setAllMachine] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [deletePopUp, setdeletePopUp] = useState(false);

  // GETTING ALL MACHINE
  const getAllMachine = async () => {
    try {
      const { data } = await axios.get(`/api/v1/machine/get-all-machine`);

      if (data) {
        setAllMachine(data?.machines);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMachine();
  }, []);

  return (
    <>
      <div className="all-machine">
        <div className="tb-user-details">
          <table
            // border={"4px solid gray"}
            style={{ borderCollapse: "collapse" }}
          >
            <tr>
              <th>Machine Name</th>

              <th>Include test</th>
              <th>Stock Req.</th>
              <th>Ordered Quantity</th>
              <th>Ordered Status</th>
              <th>Manage</th>
            </tr>
            {allMachine?.map((item) => (
              <>
                <tr className="machine-card" key={item?._id}>
                  <td>{item?.machineName}</td>
                  <td>{item?.testName}</td>
                  <td>{item?.machineUnit}</td>
                  <td>6</td>
                  <td>Shipped</td>
                  <td><button>Manage</button></td>
                </tr>
                <tr>
              <p>dfghj</p>
              <p>fcgvhbjkjl</p>
            </tr>
              </>
            ))}
           
          </table>
        </div>

      </div>
    </>
  );
};

export default AllMachine;
