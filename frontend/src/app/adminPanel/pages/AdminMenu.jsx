import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contextAPI/authContext';
import { toast } from 'react-toastify';

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("userInfo");
    const timer = setTimeout(()=>{
      toast.success("Logout Successfully!!");
    },100)
    
    return;
  };
  return (
    <>
    <div className="admin-menu-page">
        <h1>Admin Panel</h1>
        <NavLink exact to={"/dashboard/admin/overall-inventory-details"}>Overall Inventory</NavLink>
        <NavLink to={"/dashboard/admin/location-wise-inventory-details"}>Location Wise Inventory</NavLink>
        <NavLink to={"/dashboard/admin/users"}>All Users Details</NavLink>
        <NavLink to={"/login"} onClick={handleLogout} style={{color:"red",}} ><i class="fa fa-sign-in" style={{ marginRight: "7px", color:"red" }}></i>Logout</NavLink>
    </div>
      
    </>
  )
}

export default AdminMenu
