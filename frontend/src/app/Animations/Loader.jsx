import React, { useEffect, useState } from 'react'
import "./loader.css"
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/image/logo.webp"

const Loader = ({path="/login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation

    useEffect(()=>{

        const interval = setInterval(()=>{
            setCount((prevValue) => --prevValue)
        }, 1000)

        count === 0 && navigate(path, {
            state: location.pathname,
        })
        return () => clearInterval (interval)
    },[count, navigate, location])
  return (
    <>
        <div className='loader-page'>
        <img src={logo} alt="logo" />
        </div>
      
    </>
  )
}

export default Loader
