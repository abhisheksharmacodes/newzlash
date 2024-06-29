import { React, useRef, useState } from "react"
// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './login.css'

import google from '../../../assets/images/signup/Google.svg'

const Login = (props) => {

    const [valid, setValid] = useState(false)

    const pass = useRef(null)
    const user_email = useRef(null)

    let validate = () => {
        if (user_email.current.value !== '' && pass.current.value !== '') {
            setValid(true)
        } else {
            setValid(false)
        }

    }

    let requestLogin = () => {
        let user_data = {
            email: user_email.current.value,
            password: pass.current.value
        }
        axios.post('http://localhost:5000/login', user_data).then((data) => {
            if (data.data)
                alert("Logged in")
            else
                alert("Incorrect")
        })
    }

    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => alert(tokenResponse),
    // });

    return <div className="flex"><div id="auth_screen" className="screen">
        <div id="container" style={{ display: props.classNameContainer }}>
            <span className="title">Log in</span>
            <div className="flex container_sections">
                <form>
                    <div id="" className="flex">
                        <input type="email" ref={user_email} onChange={validate} placeholder="Email"></input>
                        <input maxLength={20} onChange={validate} type="password" id="pass" ref={pass} placeholder="Password"></input>
                    </div>
                </form>
                <button onClick={requestLogin} disabled={!valid}>Log in</button>
            </div>
            <div className="hr"></div>
            {/* <div className="container_sections flex login_opts">
                <div className="icon_button" onClick={login}>
                    <img className="signin_icons" src={google}></img>
                    Log in using Google
                </div>
            </div> */}
            <div className="container_sections flex">
                <Link to="/signup" className="link_text">Don't have an account? Create one.</Link>
            </div>
        </div>
    </div>
    </div>
}

export default Login