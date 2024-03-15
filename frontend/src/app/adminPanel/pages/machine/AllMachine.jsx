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
      <div className="all-reagent">
        {allMachine?.map((item) => (
          <div className="reagent-card" key={item?._id}>
            <p>{item?.machineName}</p>
            <p>{item?.testName}</p>
            <p>{item?.reagent?.map((reag)=>(
                <div key={reag?._id}>
                    <p>{reag?.reagentName}</p>
                    <p>{reag?.reqPerTest} {reag?.reagentUnit}</p>
                </div>
            ))}</p>
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
          </div>
        ))}
      </div>
    </>
  );
};

export default AllMachine;
