import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contextAPI/authContext";

const OrderMachine = ({ popUp }) => {
  const [auth] = useAuth();
  const [city, setCity] = useState(auth?.user?.city);
  const [test, setTest] = useState([]);
  const [data, setData] = useState({});
  const [showReagentDetails, setShowReagentDetails] = useState(false);

  const [reagentName, setReagentName] = useState("");
  const [reagentUnit, setReagentUnit] = useState("");
  const [reqPerTest, setReqPerTest] = useState("");
  const [reagent, setReagent] = useState([]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
    return;
  };

  // GETTING ALL TEST RELETED TO CHOOSEN CATEGORY */
  const getTest = async () => {
    // e.preventDefault();
    try {
      const res = await axios.get(
        `/api/v1/test/all-test/category-wise/${data.testCategory}`
      );

      if (res?.data) {
        setTest(res?.data?.test);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (data?.testCategory) getTest();
  }, [data?.testCategory]);

  const handleData = async (e) => {
    e.preventDefault();

    const { machineName, machineUnitOrder,machineCost, testLimit, testCategory, testName } =
      data;
    if (
      !machineName ||
      !machineUnitOrder ||
      !machineCost ||
      !testLimit ||
      !testCategory ||
      !testName ||
      !city
    ) {
      toast.warn("Enter all details");
      return;
    }
    try {
      const { data } = await axios.post(`/api/v1/order/order-machine`, {
        city,
        machineName,
        machineUnitOrder,
        machineCost,
        testLimit,
        testCategory,
        testName,
        reagent,
      });

      if (data) {
        toast.success(data?.message);
        setData({
          machineName: "",
          machineUnitOrder: "",
          machineCost:"",
          testLimit: "",
          testCategory: "",
          testName: "",
        });
        setReagent([]);
        popUp(false);
        return;
      }

      toast.error(data?.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const addReagentDetails = (e) => {
    e.preventDefault();

    setReagent({ ...reagent, reagentName, reqPerTest });

    setReagentName("");
    setReqPerTest("");
    setReagentUnit("");
    setShowReagentDetails(false);
  };

  return (
    <>
      <div className="new-order-details">
        <h1 className="i-heading">Ordered Machine Details</h1>
        <form action="">
          <div className="location">
            <select
              onChange={(e) => {
                setCity(e.target.value);
              }}
              value={city}
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

          <div>
            <input
              type="text"
              placeholder="Enter Machine Name"
              name="machineName"
              value={data.machineName}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="No of Units Ordered"
              name="machineUnitOrder"
              value={data.machineUnitOrder}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Cost per Machine"
              name="machineCost"
              value={data.machineCost}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Test Limit per"
              name="testLimit"
              value={data.testLimit}
              onChange={handleChange}
            />
          </div>
          <div className="machine-test-cat">
            <select
              name="testCategory"
              value={data.testCategory}
              onChange={handleChange}
            >
              <option value="">--- Select Department ---</option>
              <option value="blood">Blood</option>
              <option value="diabetes">Diabetes</option>
              <option value="thyroid">Thyroid</option>
              <option value="vitamin">Vitamin</option>
              <option value="liver">Liver</option>
              <option value="kedney">Kidney</option>
            </select>
          </div>

          <div>
            <select
              name="testName"
              value={data.testName}
              onChange={handleChange}
            >
              <option value="">--- Choose Test ---</option>
              {test?.map((item) => (
                <option key={item?._id} value={item?.testName}>
                  {item?.testName}
                </option>
              ))}
            </select>
          </div>

          <div className="reagent-detail">
            <div style={{ margin: "0", padding: "0" }}>
              <div>
                <span>If Reagent Required to Work? </span>
                <button
                  className="btn"
                  style={{
                    background: "green",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowReagentDetails(true);
                  }}
                >
                  {showReagentDetails ? "Add More" : "Add Details"}
                </button>
              </div>
              <div className="added-reagent"></div>
            </div>

            <div
              className="add-reagent-details"
              style={{ display: `${showReagentDetails ? "block" : "none"}` }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Enter Reagent Name"
                  value={reagentName}
                  onChange={(e) => setReagentName(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={reagentUnit}
                  onChange={(e) => setReagentUnit(e.target.value)}
                >
                  <option value="">--Choose Reagent Unit--</option>
                  <option value="">mg/dl</option>
                  <option value="">ml</option>
                  <option value="">ng/dl</option>
                  <option value="">g/dl</option>
                </select>
              </div>
              <div>
                <h3>Amount Required Per Test</h3>
                <div>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    style={{ marginTop: "0" }}
                    value={reqPerTest}
                    onChange={(e) => setReqPerTest(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  className="btn"
                  onClick={addReagentDetails}
                  style={{ background: "blue", margin: "0px " }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
        <div>
          <button
            className="btn"
            onClick={handleData}
            style={{ width: "350px", marginRight: "30px", background: "blue" }}
          >
            Order Machine
          </button>
          <button className="btn" onClick={() => popUp(false)}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderMachine;
