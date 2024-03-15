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
      <div className="all-reagent">
        {allReagent?.map((reag) => (
          <div className="reagent-card" key={reag?._id}>
            <p>{reag?.reagentName}</p>
            <p>{reag?.reagentAmount} {reag?.reagentUnit}</p>
            <div>
                <button className="btn" onClick={(e) => {setSelectedId(reag?._id); setUpdatePopUp(true)}}>Update Amount</button>
                <button className="btn" onClick={(e) =>{ setSelectedId(reag?._id); setdeletePopUp(true)}}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:`${deletePopUp ? "block": "none"}`, position:"fixed", top:"20%", left:"30%", textAlign:"center"}} >
        <DeleteReagent id={selectedId} setDeletePopUp={setdeletePopUp} getTotalBooking={getAllReagent}/>
      </div>

      <div style={{display:`${updatePopUp ? "block": "none"}`, position:"fixed", top:"20%", left:"30%", textAlign:"center"}} >
        <UpdateReagent id={selectedId} setPopUp = {setUpdatePopUp} callBack = {getAllReagent}/>
      </div>
    </>
  );
};

export default AllReagent;
