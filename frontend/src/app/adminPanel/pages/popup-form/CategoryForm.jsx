import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contextAPI/authContext";

const CategoryForm = ({ name, setUpdatedName, setEditPopUp, id,getAllCat }) => {
  const [auth] = useAuth();
  const initialName = name;

  const handleData = async (e) => {
    e.preventDefault();
    console.log(auth?.token);
    try {
      const res = await axios.put(`/api/v1/category/update-category/${id}`, {
        name,
      });
      console.log(res.data.success);
      if (res.status == 200) {
        toast.success(initialName+ " change to " + name+" successfully!");
        setEditPopUp(false)
        id="";
        getAllCat();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
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
        <span
          style={{
            background: "red",
            color: "white",
            padding: "5px 10px",
            position: "absolute",
            right: "0",
            top: "0",
            cursor: "pointer",
          }}
          onClick={() => setEditPopUp(false)}
        >
          X
        </span>
        <div>
          <input
            type="text"
            name=""
            id="new-category"
            value={name}
            style={{ width: "70%" }}
            onChange={(e) => {
              setUpdatedName(e.target.value);
            }}
          />
          <button
            className="btn"
            style={{ background: "green" }}
            onClick={handleData}
          >
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
