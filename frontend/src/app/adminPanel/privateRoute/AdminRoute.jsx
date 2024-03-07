import React, { useEffect, useState } from 'react';
import {useAuth} from "../../../contextAPI/authContext";
import {Outlet} from "react-router-dom";
import axios from "axios"
import Loader from '../../Animations/Loader';

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth()

    useEffect(()=>{
        const authCheck = async () =>{
            const res = await axios.get("/api/v1/auth/admin-auth")

            console.log(res.data.ok)
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.user?.isAdmin) authCheck();
    },[auth?.user?.isAdmin])
  return (
    <>
      {ok ? <Outlet/> : <Loader path= {"/"}/>}
    </>
  )
}

export default AdminRoute
