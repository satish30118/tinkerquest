import React, { useState } from "react";

import "../../admin.css";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import { useAuth } from "../../../../contextAPI/authContext";
import "./machine.css"

const MachineReport = () => {
    const [auth] = useAuth();
    const [city, setCity] = useState()
    const [showDetails, setShowDetails] = useState()
    return (
        <Layout>
            <div className="admin-dashboard">
                <div className="menu">
                    <AdminMenu />
                </div>
                <div className="content">
                    <div className="dashboard-heading">
                        <h1 className="dashboard-heading"><u>Inventory performance</u></h1>
                    </div>

                    <div className="new-machine-details">
                        <form action="">
                            <div className="location">
                                <select
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                        setShowDetails(false);
                                    }}
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

                            <div >
                                <input type="text" placeholder="Enter Machine Name" />
                            </div>

                            <div className="machine-test-cat">
                                <select
                                    name="testCategory"
                                // value={data.testCategory}
                                // style={{ width: "70%" }}
                                // onChange={handleChange}
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

                            <div >
                                <select name="" id="">
                                    <option value="">--Choose Test--</option>
                                </select>
                            </div>

                            <div className="reagent-detail-radio" >

                                <h3>Reagent Required?</h3>

                                <input type="radio" style={{ width: "25px", margin:"0", padding:"0",height:"15px" }} />
                                <label htmlFor="">Yes</label>

                                <input type="radio" name="" id="" style={{ width: "25px", margin:"0", padding:"0",height:"15px" }} />
                                <label htmlFor="">No</label>


                            </div>

                            <div className="add-reagent-details">
                                <div>
                                    <input type="text" placeholder="Enter Reagent Name" />
                                </div>
                                <div>
                                    <select name="" id="">
                                        <option value="">--Choose Reagent Unit--</option>
                                        <option value="">mg/dl</option>
                                        <option value="">ml</option>
                                        <option value="">ng/dl</option>
                                        <option value="">g/dl</option>
                                    </select>
                                </div>
                                <div className="reagent-detail">
                                    <h3>Amount Required Per Test</h3>
                                    <input type="number" placeholder="Enter Amount" style={{marginTop:"0"}}/>

                                </div>
                                <div>
                                    <button className="btn">Add Reagent</button>
                                </div>
                            </div>
                            <div>
                                <button className="btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </Layout >
    );
};

export default MachineReport;
