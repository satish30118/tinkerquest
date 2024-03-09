import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contextAPI/authContext';
import { toast } from 'react-toastify';

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  
  return (
    <>
    <div className="admin-menu-page">
        <h1>Admin Panel</h1>
        <NavLink exact to={"/dashboard/admin/overall-inventory-details"}>Overall Inventory</NavLink>
        <NavLink to={"/dashboard/admin/location-wise-inventory-details"}>Location Wise Inventory</NavLink>
        <NavLink to={"/dashboard/admin/new-test-booking"}>Book New Test</NavLink>
    </div>
      
    </>
  )
}

export default AdminMenu
