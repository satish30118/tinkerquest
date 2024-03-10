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
        <p className='admin-img'><img src="https://previews.123rf.com/images/captainvector/captainvector1509/captainvector150900359/45343495-dentist.jpg" alt="" /></p>
        <NavLink exact to={"/dashboard/admin/overall-inventory-details"}>Overall Inventory</NavLink>
        <NavLink to={"/dashboard/admin/location-wise-inventory-details"}>Location Wise Inventory</NavLink>
        <NavLink to={"/dashboard/admin/new-test-booking"}>Book Test</NavLink>
        <NavLink to={"/dashboard/admin/add-new-test-method"}>Add New Test Method & Price</NavLink>


    </div>
      
    </>
  )
}

export default AdminMenu
