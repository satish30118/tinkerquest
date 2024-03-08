import React from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../layout/Layout"

const TotalTest = () =>{
    return(
        <Layout>
        <div className="admin-dashboard">
          <div className="menu">
            <AdminMenu />
          </div>
          <div className="content">
            {/* <div className="dashboard-heading">
              <h1 className="dashboard-heading"></h1>

            </div> */}
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
      </Layout>
    )
}


 export default TotalTest;