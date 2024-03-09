import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "../app/Components/home/Home";
import Login from "../app/auth/Login";
import Register from "../app/auth/Register";
import ForgotPassword from "../app/auth/forgotpassword/ForgotPassword";
import ErrorPage from "../app/layout/ErrorPage";
import UserDashboard from "../app/Components/dashboard/UserDashboard";
import UserRoute from "../app/auth/privateRoutes/UserRoute";
import AdminDashboard from "../app/adminPanel/AdminDashboard";
import AdminRoute from "../app/adminPanel/privateRoute/AdminRoute";
import Users from "../app/adminPanel/pages/Users";
import OverallInventory from "../app/adminPanel/pages/overallInventory/OverallInventory";
import LocationwiseInventory from "../app/adminPanel/pages/locationwiseInventory/LocationwiseInventory";
import TotalBooking from "../app/adminPanel/pages/overallInventory/TotalBooking";
import TotalCompleted from "../app/adminPanel/pages/overallInventory/TotalCompleted";
import TotalPending from "../app/adminPanel/pages/overallInventory/TotalPending";
import NewTestBoooking from "../app/Components/booking/NewTestBooking";
import NewBoooking from "../app/adminPanel/pages/newtestbooking/NewBooking";
import AboutUs from "../app/Components/aboutUs/AboutUs";
import TestReport from "../app/Components/testReport/TestReport";
import LocationWiseTotalBooking from "../app/adminPanel/pages/locationwiseInventory/LocationWiseTotalBooking";
import LocationWiseTotalPending from "../app/adminPanel/pages/locationwiseInventory/LocationWiseTotalPending";
import LocationWiseTotalCompleted from "../app/adminPanel/pages/locationwiseInventory/LocationWiseTotalCompleted.jsx";
import NewTestMethod from "../app/adminPanel/pages/newtestdetails/NewTestMethod.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/about-us" element={<AboutUs />}></Route>
        <Route exact path="/test-report" element={<TestReport/>}></Route>
        <Route exact path="/new-test-booking" element={<NewTestBoooking />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route
          exact
          path="/forgot-password"
          element={<ForgotPassword />}
        ></Route>
        <Route exact path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />}></Route>
          <Route path="user/all-report" element={<UserDashboard />}></Route>
        </Route>
        <Route exact path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route
            path="admin/overall-inventory-details"
            element={<OverallInventory />}
          ></Route>
          <Route
            path="admin/overall-inventory-details/total-booking"
            element={<TotalBooking />}
          ></Route>
          <Route
            path="admin/overall-inventory-details/total-booking-completed"
            element={<TotalCompleted />}
          ></Route>
          <Route
            path="admin/overall-inventory-details/total-booking-pending"
            element={<TotalPending />}
          ></Route>
          <Route
            path="admin/location-wise-inventory-details"
            element={<LocationwiseInventory />}
          ></Route>
            <Route
            path="admin/location-wise-inventory-details/total-booking/:city"
            element={<LocationWiseTotalBooking />}
          ></Route>
          <Route
            path="admin/location-wise-inventory-details/total-booking-completed/:city"
            element={<LocationWiseTotalCompleted />}
          ></Route>
          <Route
            path="admin/location-wise-inventory-details/total-booking-pending/:city"
            element={<LocationWiseTotalPending />}
          ></Route>
          <Route
            path="admin/new-test-booking"
            element={<NewBoooking/>}
          ></Route>
           <Route
            path="admin/add-new-test-method"
            element={<NewTestMethod/>}
          ></Route>
         
          <Route path="admin/users" element={<Users />}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
