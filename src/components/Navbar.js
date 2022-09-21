import React, { useEffect } from 'react'
import "../App.css"
import Auth from '../utils/auth'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate('/dashboard')
    }
    else{
      navigate('/')
    }
  }, [Auth.loggedIn()])

  return (
    <>
      <div className='navbar'>
        {
          !Auth.loggedIn() ?
            <div>Log In</div>
            :
            <div onClick={Auth.logout}>Logout</div>
        }
      </div>
    </>
  )
}

export default Navbar
