import React from "react";

const DeleteAlert = ({setDeletePopUp,rmCategory,rmElement }) => {
  return (
    <>
      <form
        style={{
          boxShadow: "0 0 12px 3px",
          padding: "20px",
          width: "400px",
          background: "lightgray",
        }}
      >
        <div>
          <div>
            You want to delete <span style={{color:"red"}}>{rmElement.name} </span> category ?
          </div>
          <button
            className="btn"
            style={{ background: "red" }}
            onClick={(e)=>{e.preventDefault(); rmCategory(rmElement.id, rmElement.name);setDeletePopUp(false)}}
          >
            Delete
          </button>
          
          <button
            className="btn"
            style={{ background: "gray" }}
            onClick={(e) =>{e.preventDefault(); setDeletePopUp(false)}}
          >
            Cancel
          </button>

        </div>
      </form>
    </>
  );
};

export default DeleteAlert;
