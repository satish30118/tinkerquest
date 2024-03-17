import axios from "axios";
import React, { useEffect, useState } from "react";

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
      <div className="tb-user-details">
        <table
          // border={"4px solid gray"}
          style={{ borderCollapse: "collapse" }}
        >
          <tr>
            <th>City</th>
            <th>Machine Name</th>
            <th>Include test</th>
            <th>No of Stock </th>
            <th>Machine Cost</th>
            <th>Test Limit</th>
            <th>Stock Status</th>

            <th></th>
          </tr>
          {allMachine?.map((item) => (
            <>
              <tr key={item?._id}>
                <td>{item?.city}</td>
                <td>{item?.machineName}</td>
                <td>{item?.testName}</td>
                <td>{item?.machineStock}</td>
                <td>{item?.machineCost}</td>
                <td>{item?.testLimit}</td>
                <td>{}</td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </>
  );
};

export default AllMachine;
