import Layout from "../../layout/Layout"
import React from "react"
import './booking.css'

const TestBoooking = () => {
    return (
        <Layout>
            <div className="booking-page">
                <h1>Test booking</h1>
                <div className="booking-form">
                    <div className="auth-row ryy">
                        <input type="text" name="" id="" placeholder="Patient Name" />
                    </div>
                    <div className="booking-gender">
                        <input type="radio" name="gender" id="male" />
                        <label htmlFor="male">Male</label>
                        <input type="radio" name="gender" id="female" pla />
                        <label htmlFor="female">Female</label>
                        <input type="radio" name="gender" id="other" />
                        <label htmlFor="other">Other</label>

                        

                    </div>
                    <div className="auth-row">
                        <input type="number" placeholder="Age" />
                    </div>
                    <div className="auth-row">
                        <input type="text" name="" id="" placeholder="Mobile No." />
                    </div>

                    <h2>Frequently Booked</h2>
                    <select name="" id="">
                        <option value="">--Select Test--</option>
                        <option value="">Blood</option>
                        <option value="">Diabetes</option>
                        <option value="">Thyroid</option>
                        <option value="">Vitamin</option>
                        <option value="">Liver</option>
                        <option value="">Kidney</option>
                    </select>


                    <select name="" id="">
                        <option value="">Select Test Name</option>

                    </select>
                    <div className="auth_row"></div>
                </div>
            </div>

        </Layout>
    )
}

export default TestBoooking;