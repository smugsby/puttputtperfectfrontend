import React, {useState} from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar'

const Login = () => {
    const [toggle, setToggle] = useState(false)
        
  return (
    <>
    <Navbar/>
    {!toggle ?
    <LoginForm/>:
    <SignupForm/>
    }
    <div>
    <div onClick={() => setToggle(false)}>

            Login
        </div>
        <div onClick={() => setToggle(true)}>

            SignUp
        </div>
    </div>
    </>
  )
}

export default Login