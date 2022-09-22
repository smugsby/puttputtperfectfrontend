import React, {useState} from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar'

const Login = () => {
    const [toggle, setToggle] = useState(false)
        
  return (
    <>
    <div id="main" className="wireFrame" style={{ width: 412, minHeight: 732 }}>
    <Navbar/>
    <p className='instructions'>You are about to enter PuttPuttPerfect
    the most interactive and enjoyable way to
    truly level up and get better!</p>
    <p className='instructions'>If you have an account then login below. If you do not have an account then sign up.</p>
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
    </div>
    </>
  )
}

export default Login