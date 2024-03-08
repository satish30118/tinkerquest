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
import TestBoooking from "../app/Components/booking/TestBooking";
import OverallInventory from "../app/adminPanel/pages/OverallInventory";
import LocationwiseInventory from "../app/adminPanel/pages/LocationwiseInventory";
import TotalBooking from "../app/adminPanel/pages/overallInventory/TotalBooking";
import TotalCompleted from "../app/adminPanel/pages/overallInventory/TotalCompleted";
import TotalPending from "../app/adminPanel/pages/overallInventory/TotalPending";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/test-booking" element={<TestBoooking />}></Route>
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
          <Route path="admin/users" element={<Users />}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
