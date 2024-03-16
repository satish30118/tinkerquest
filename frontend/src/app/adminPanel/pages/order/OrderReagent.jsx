import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contextAPI/authContext";

const OrderReagent = ({ popUp }) => {
  const [auth] = useAuth();
  const [city, setCity] = useState(auth?.user?.city);
  const [data, setData] = useState({});

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
    return;
  };

  // ADDING NEW REAGENT
  const handleData = async (e) => {
    e.preventDefault();

    const { reagentName, reagentUnit, reagentAmount } = data;
    if (!reagentName || !reagentUnit || !reagentAmount) {
      toast.warn("Enter all details");
      return;
    }
    try {
      const { data } = await axios.post(`/api/v1/reagent/create-reagent`, {
        city,
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
        return;
      }

      toast.error(data?.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="new-order-details">
      <h1 className="i-heading">Ordered Reagent Details</h1>
        <form action="">
          <div className="location">
            <select
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              <option value="">--- Choose Lab Location ---</option>
              <option value="Noida">Noida</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Dehradun">Dehradun</option>
              <option value="Roorkee">Roorkee</option>
              <option value="Kolkata">Kolkata </option>
              <option value="Pune">Pune</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Patna">Patna</option>
            </select>
          </div>

          {/* <div className="add-reagent-details"> */}
          <div>
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
              placeholder="Enter Amount Ordered"
              style={{ marginTop: "0" }}
              name="reagentOrder"
              value={data.reagentOrder}
              onChange={handleChange}
            />
          </div>
        
        </form>
        <div>
          <button
            className="btn"
            style={{
              width: "350px",
              marginRight: "30px",
              background: "blue",
            }}
            onClick={handleData}
          >
            Order Reagent
          </button>
          <button className="btn" onClick={() => popUp(false)}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderReagent;
