import React, { useEffect, useState } from 'react';
import {useAuth} from "../../../contextAPI/authContext";
import {Outlet} from "react-router-dom";
import axios from "axios"
import Loader from '../../Animations/Loader';

const UserRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth()

    useEffect(()=>{
        const authCheck = async () =>{
            const res = await axios.get("/api/v1/auth/user-auth", {
                headers:{
                    "Authorization" : auth?.token,
                }
            })

            console.log(res.data.ok)
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token])
  return (
    <>
      {ok ? <Outlet/> : <Loader/>}
    </>
  )
}

export default UserRoute;
