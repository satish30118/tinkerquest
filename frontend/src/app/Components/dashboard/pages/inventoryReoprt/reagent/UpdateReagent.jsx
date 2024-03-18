import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../../../contextAPI/authContext";



const UpdateReagent = ({ id, setPopUp, callBack }) => {
  const [auth] = useAuth();
  const [data, setData] = useState({});

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
    return;
  };

  // Updating REAGENT
  const handleData = async (e) => {
    e.preventDefault();

    const { reagentName, reagentUnit, reagentAmount } = data;
    if (!reagentName || !reagentUnit || !reagentAmount) {
      toast.warn("Enter all details");
      return;
    }
    try {
      const { data } = await axios.put(`/api/v1/reagent/update-reagent/${id}`, {
        reagentName,
        reagentUnit,
        reagentAmount,
      });

      if (data) {
        toast.success(data?.message);
        setData({
          reagentName: "",
          reagentUnit: "",
          reagentAmount: "",
        });

        setPopUp(false);
        callBack();
        return;
      }

      toast.error(data?.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // GET SELECTED REAGNET
  const getSelectedreagent = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/reagent/get-single-reagent/${id}`
      );

      if (data) {
        // toast.success(data?.message);
        setData(data?.reagent);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (id) getSelectedreagent();
  }, [id]);
  return (
    <>
      <div
        className="update-inven"
        style={{ width: "400px", background: "lightGray" }}
      >
        <form >
          {/* <div className="add-reagent-details"> */}
          <div style={{ paddingBottom: "10px" }}>
            <span
              style={{
                background: "red",
                color: "white",
                padding: "5px 20px",
                position: "absolute",
                right: "0",
                top: "0",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => setPopUp(false)}
            >
              X
            </span>
          </div>
          <div >
            <input
              type="text"
              placeholder="Enter Reagent Name"
              name="reagentName"
              value={data.reagentName}
              onChange={handleChange}
            />
          </div>
          <div>
            <select
              name="reagentUnit"
              value={data.reagentUnit}
              onChange={handleChange}
            >
              <option value="">--Choose Reagent Unit--</option>
              <option value="mg/dl">mg/dl</option>
              <option value="ml">ml</option>
              <option value="ng/dl">ng/dl</option>
              <option value="g/dl">g/dl</option>
            </select>
          </div>

          <div>
            <input
              type="number"
              placeholder="Enter Amount"
              style={{ marginTop: "0" }}
              name="reagentAmount"
              value={data.reagentAmount}
              onChange={handleChange}
            />
          </div>

          {/* </div> */}
          <div>
            <button
              className="btn"
              style={{
                width: "350px",
                margin: "30px 0",
                background: "blue",
              }}
              onClick={handleData}
            >
              Update Reagent Details
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateReagent;
