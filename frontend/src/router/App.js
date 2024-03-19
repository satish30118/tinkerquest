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
import Users from "../app/adminPanel/pages/user/Users";
import OverallInventory from "../app/adminPanel/pages/overallInventory/OverallInventory";
import LocationwiseInventory from "../app/adminPanel/pages/locationwiseInventory/LocationwiseInventory";
import TotalBooking from "../app/adminPanel/pages/overallInventory/TotalBooking";
import TotalCompleted from "../app/adminPanel/pages/overallInventory/TotalCompleted";
import TotalPending from "../app/adminPanel/pages/overallInventory/TotalPending";
import NewTestBoooking from "../app/Components/booking/NewTestBooking";
import AboutUs from "../app/Components/aboutUs/AboutUs";
import TestReport from "../app/Components/testReport/TestReport";
import LocationWiseTotalBooking from "../app/adminPanel/pages/locationwiseInventory/LocationWiseTotalBooking";
import LocationWiseTotalPending from "../app/adminPanel/pages/locationwiseInventory/LocationWiseTotalPending";
import LocationWiseTotalCompleted from "../app/adminPanel/pages/locationwiseInventory/LocationWiseTotalCompleted.jsx";
import NewTestMethod from "../app/adminPanel/pages/newtestdetails/NewTestMethod.jsx";
import Forecasting from "../app/adminPanel/pages/forecasting/Forecasting.jsx";
import Chat from "../app/adminPanel/pages/chat/Chat.jsx";
import OrderReport from "../app/adminPanel/pages/order/OrderReport.jsx";
import InventoryReport from "../app/adminPanel/pages/inventoryReoprt/InventoryReport.jsx";
import UserTestBooking from "../app/Components/dashboard/pages/bookingAnalysis/UserTestBooking.jsx";
import UserTestCompleted from "../app/Components/dashboard/pages/bookingAnalysis/UserTestCompleted.jsx";
import UserTestPending from "../app/Components/dashboard/pages/bookingAnalysis/UserTestlPending.jsx";
import UserForecasting from "../app/Components/dashboard/pages/forecasting/UserForecasting.jsx";
import UserInventoryReport from "../app/Components/dashboard/pages/inventoryReoprt/UserInventoryReport.jsx";
import UserChat from "../app/Components/dashboard/pages/chat/UserChat.jsx";
import UserOrderReport from "../app/Components/dashboard/pages/order/UserOrderReport.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/about-us" element={<AboutUs />}></Route>
        <Route exact path="/test-report" element={<TestReport />}></Route>
        <Route
          exact
          path="/new-test-booking"
          element={<NewTestBoooking />}
        ></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route
          exact
          path="/forgot-password"
          element={<ForgotPassword />}
        ></Route>

        {/* // USER DASHBOASR // */}
        <Route exact path="/dashboard/" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />}></Route>
         
          <Route
            path="user/location-wise-inventory-details"
            element={<LocationwiseInventory />}
          ></Route>
          <Route
            path="user/location-wise-inventory-details/total-booking/:city"
            element={<UserTestBooking />}
          ></Route>
          <Route
            path="user/location-wise-inventory-details/total-booking-completed/:city"
            element={<UserTestCompleted />}
          ></Route>
          <Route
            path="user/location-wise-inventory-details/total-booking-pending/:city"
            element={<UserTestPending />}
          ></Route>
          <Route path="user/forecasting" element={<UserForecasting />}></Route>
          <Route
            path="user/inventory-report-and-analysis"
            element={<UserInventoryReport />}
          ></Route>
          <Route
           exact path="user/inventory-order-tracking"
            element={<UserOrderReport />}
          ></Route>
          <Route path="user/chat" element={<UserChat />}></Route>
        </Route>

        {/* // ADMIN DASHBOARD // */}
        <Route exact path="/dashboard" element={<AdminRoute />}>
          <Route exact path="admin" element={<AdminDashboard />}></Route>
          <Route
           exact path="admin/overall-inventory-details/total-booking"
            element={<TotalBooking />}
          ></Route>
          <Route
           exact path="admin/overall-inventory-details/total-booking-completed"
            element={<TotalCompleted />}
          ></Route>
          <Route
           exact path="admin/overall-inventory-details/total-booking-pending"
            element={<TotalPending />}
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
           exact path="admin/add-new-test-method"
            element={<NewTestMethod />}
          ></Route>
          <Route exact path="admin/forecasting" element={<Forecasting />}></Route>
          <Route
           exact path="admin/inventory-report-and-analysis"
            element={<InventoryReport />}
          ></Route>
          <Route
           exact path="admin/inventory-order-tracking"
            element={<OrderReport />}
          ></Route>
          <Route exact path="admin/chat" element={<Chat />}></Route>
          <Route exact path="admin/users" element={<Users />}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
