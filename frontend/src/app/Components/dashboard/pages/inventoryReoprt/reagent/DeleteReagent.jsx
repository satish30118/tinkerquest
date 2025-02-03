import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const DeleteReagent = ({ setDeletePopUp, id, getTotalBooking, setId }) => {
  /* ALL BOOKINGs */
  const deleteBooking = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/reagent/delete-reagent/${id}`
      );

      if (data) {
        toast.success(`${id} deleted successfully!`);
        getTotalBooking();
        setId = "";
        setDeletePopUp(false)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again");
    }
  };
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
            You want to delete <span style={{ color: "red" }}>{id} </span>{" "}
            booking?
          </div>
          <button
            className="btn"
            style={{ background: "red" }}
            onClick={deleteBooking}
          >
            Delete
          </button>

          <button
            className="btn"
            style={{ background: "gray" }}
            onClick={(e) => {
              e.preventDefault();
              setDeletePopUp(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default DeleteReagent;
