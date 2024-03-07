import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contextAPI/authContext';
import { toast } from 'react-toastify';

const UserMenu = () => {
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
        <h1>User Panel</h1>
        <NavLink exact to={"/dashboard/user/all-report"}>See All Report</NavLink>
        <NavLink to={"/login"} onClick={handleLogout} style={{color:"red",}} ><i class="fa fa-sign-in" style={{ marginRight: "7px", color:"red" }}></i>Logout</NavLink>
    </div>
      
    </>
  )
}

export default UserMenu
