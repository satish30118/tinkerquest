import React from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../layout/Layout"

const LocationwiseInventory = () =>{
    return(
        <Layout>
        <div className="admin-dashboard">
          {/* <div className="menu">
            <AdminMenu />
          </div> */}
          <div className="content">
            {/* <div className="dashboard-heading">
              <h1 className="dashboard-heading"></h1>

            </div> */}
            <div className="location">
           <select name="" id="" >
            <option value="">--Choose City--</option>
            <option value="noida">1699021932207-Noida</option>
            <option value="mumbai">1699108688232-Mumbai</option>
            <option value="dehradun">1698935599382-Dehradun</option>
            <option value="roorkee">1698921148662-Roorkee</option>
            <option value="kolkata">1699281160794-Kolkata </option>
            <option value="pune">1699194762631-Pune</option>
            <option value="nagpur">1699007458706-Nagpur</option>\
            <option value="lucknow">1699540301350-Lucknow</option>
            <option value="patna">1699166014219-Patna</option>
             </select>
               
               <button className="btn">
                    Get Details
               </button>
             </div>

            <div className="overall-location-page">
                <h2 className="detail">Details Analysis in Mumbai</h2>
                <div className="overall-page">
            <div className="overall">
                <h2>Total Test Appointment</h2>
                <p>434</p>
            </div>

            <div className="overall">
                <h2>Appointment Completed</h2>
                <p>500</p>
            </div>

            <div className="overall">
                <h2>Pending Appointment</h2>
                <p>434</p>
            </div>

            <div className="overall">
                <h2>Revenue Generated</h2>
                <p>$100</p>
            </div>
            <div className="overall">
                <h2>Total Inventory Stock</h2>
                <p>434</p>
            </div>
            <div className="overall">
                <h2>Suggestion</h2>
                <p>You need to increase nursues in the lab</p>
            </div>
            </div>




            </div>
          </div>
        </div>
      </Layout>
    )
}


 export default LocationwiseInventory;