import { React, useRef, useState } from "react"
// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import {Link} from 'react-router-dom'

import './login.css'

import google from '../../../assets/images/signup/Google.svg'

const Login = (props) => {

    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [valid, setValid] = useState(false)
    const [validEmail, setValidEmail] = useState(true)
    const [startCheckingEmail, setStartCheckingEmail] = useState(false)
    const [loginClose, setloginClose] = useState(false)

    const [veryWeak, setVeryWeak] = useState(false)
    const [Weak, setWeak] = useState(false)
    const [Moderate, setModerate] = useState(false)
    const [Strong, setStrong] = useState(false)
    const [veryStrong, setVeryStrong] = useState(false)

    const fname = useRef(null)
    const lname = useRef(null)
    const pass = useRef(null)
    const repass = useRef(null)
    const user_email = useRef(null)
    const checkPass = useRef(null)
    const passMessage = useRef(null)

    const veryWeak_ = useRef(null)
    const Weak_ = useRef(null)
    const Moderate_ = useRef(null)
    const Strong_ = useRef(null)
    const veryStrong_ = useRef(null)

    const status = [veryWeak_, Weak_, Moderate_, Strong_, veryStrong_]

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
        axios.post('http://localhost:5000/users/adduser', user_data).then(() => {
            alert("Account created")
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