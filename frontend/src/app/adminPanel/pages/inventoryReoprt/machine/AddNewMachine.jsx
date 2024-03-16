import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contextAPI/authContext";

const AddNewMachine = () => {
  const [auth] = useAuth();
  const [city, setCity] = useState(auth?.user?.city);
  const [test, setTest] = useState([]);
  const [data, setData] = useState({});
  const [showReagentDetails, setShowReagentDetails] = useState(false);

  const [reagentName, setReagentName] = useState("");
  const [reagentUnit, setReagentUnit] = useState("");
  const [reqPerTest, setReqPerTest] = useState("");
  const [reagent, setReagent] = useState([{}]);


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

    const { machineName, machineUnit, testCategory, testName } = data;
    if (!machineName || !machineUnit || !testCategory || !testName || !city) {
      toast.warn("Enter all details");
      return;
    }
    try {
      const { data } = await axios.post(`/api/v1/machine/create-machine`, {
        city,
        machineName,
        machineUnit,
        testCategory,
        testName,
        reagent,
      });

      if (data) {
        toast.success(data?.message);
        setData({
          machineName: "",
          machineUnit: "",
          testCategory: "",
          testName: "",
        });
        setReagent([]);
        // let ele = document.getElementsByName("gender");
        // for (var i = 0; i < ele.length; i++) ele[i].checked = false;
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
      <div className="new-machine-details">
        <form action="">
          <div className="location">
            <select
              onChange={(e) => {
                setCity(e.target.value);
              }}
              value={city}
            >
              <option value="">--- Choose City ---</option>
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
              value={data.machineNane}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="No of Units available in Lab"
              name="machineUnit"
              value={data.machineUnit}
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

          <div className="reagent-detail-radio">
            <h3>
              If Reagent Required{" "}
              <button
                className="btn"
                style={{
                  background: "green",
                  display: `${showReagentDetails ? "none" : "inline"}`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowReagentDetails(true);
                }}
              >
                Add Reagent
              </button>
            </h3>
            <div style={{ display: `${reagent !== "" ? "block" : "none"}` }}>
              <table border={"2px solid black"} style={{ margin: "0 auto" }}>
                <tr style={{ padding: "10px" }}>
                  <th style={{ padding: "10px" }}>Reagent Name</th>
                  <th style={{ padding: "10px" }}>Reagent Required Per Test</th>
                </tr>

                {reagent?.map((reag) => (
                  <tr>
                    <td>{reag?.reagentName}</td>
                    <td>{reag?.reqPerTest}</td>
                  </tr>
                ))}
              </table>
            </div>
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
            <div className="reagent-detail">
              <h3>Amount Required Per Test</h3>
              <input
                type="number"
                placeholder="Enter Amount"
                style={{ marginTop: "0" }}
                value={reqPerTest}
                onChange={(e) => setReqPerTest(e.target.value)}
              />
            </div>
            <div>
              <button
                className="btn"
                onClick={addReagentDetails}
                style={{ background: "blue", margin: "30px 0" }}
              >
                Add Reagent
              </button>
            </div>
          </div>

          <div>
            <button
              className="btn"
              onClick={handleData}
              style={{ width: "350px", margin: "30px 0" }}
            >
              Add Machine
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewMachine;
