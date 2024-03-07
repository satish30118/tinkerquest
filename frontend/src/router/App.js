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
import ManageCategory from "../app/adminPanel/pages/ManageCategory";
import Users from "../app/adminPanel/pages/Users";
import CreateProduct from "../app/adminPanel/pages/CreateProduct";
import AllProduct from "../app/adminPanel/pages/AllProduct";
import UpdateProduct from "../app/adminPanel/pages/UpdateProduct";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
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
            path="admin/manage-category"
            element={<ManageCategory />}
          ></Route>
          <Route
            path="admin/create-product"
            element={<CreateProduct/>}
          ></Route>
          <Route
            path="admin/all-product"
            element={<AllProduct/>}
          ></Route>
          <Route
            path="admin/update-product/:slug"
            element={<UpdateProduct/>}
          ></Route>
          <Route path="admin/users" element={<Users />}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
