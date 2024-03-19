import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../../contextAPI/authContext";

const AllMachine = () => {
  const [auth, setAuth] = useAuth();
  const [allMachine, setAllMachine] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [deletePopUp, setdeletePopUp] = useState(false);
  const city = auth?.user?.city;

  // GETTING ALL MACHINE
  const getAllMachine = async () => {
    try {
      const { data } = await axios.get(`/api/v1/machine/get-all-machine-citywise/${city}`);

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

  function printData() {
    var divToPrint = document.getElementById("printTable");
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
        <table id="printTable" style={{ borderCollapse: "collapse" }}>
          <tr>
            <th>Lab Location</th>
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
                <td style={{ padding: "9px 0" }}>{item?.city}</td>
                <td>{item?.machineName}</td>
                <td>{item?.testName}</td>
                <td>{item?.machineStock}</td>
                <td>{item?.machineCost}</td>
                <td>{item?.testLimit}</td>
                <td style={{fontWeight:"600",color:`${item?.machineStock < 2 ? "red" :"lightgreen"}`}}>{item?.machineStock < 2 ? " Out of Stock" : "In-Stock"}</td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </>
  );
};

export default AllMachine;
