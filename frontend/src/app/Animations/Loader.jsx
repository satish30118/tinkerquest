import React, { useEffect, useState } from 'react'
import "./loader.css"
import { useLocation, useNavigate } from 'react-router-dom';

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
            <h1>Redirecting you in {count} seconds  </h1>
            <div className="loader-text">
                <p id='c1' className='c'></p>
                <p id='c2' className='c'></p>
                <p id='c3' className='c'></p>

            </div>
        </div>
      
    </>
  )
}

export default Loader
