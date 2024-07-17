import { React, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Cookies from 'js-cookie'

import './login.css'

import logo from '../../../assets/images/logo.png'


const Login = () => {


    let navigate = useNavigate()

    const [valid, setValid] = useState(false)
    const [error, setError] = useState(false)
    const [errorStatement,setErrorStatement] = useState('')

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
            if (data.data == 'email') {
                setError(true)
                setErrorStatement('Email not found')
            } else if (data.data == 'pass') {
                setError(true)
                setErrorStatement('Password mismatched')
            } else {
                Cookies.set('id', data.data, { expires: 7 })
                Cookies.set('loggedIn', 'true', { expires: 7 });
                Cookies.set('email', user_email.current.value, { expires: 7 });
                navigate('/dashboard')
            }
        })
    }



    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => alert(tokenResponse),
    // });

    return <div className="flex login"><div id="auth_screen" className="screen" style={{ flexDirection: 'column' }}>
        <div id="container">
            <span className="title">Log in</span>
            <div className="flex container_sections">
                <form>
                    <div id="" className="flex">
                        <input type="email" ref={user_email} onChange={validate} placeholder="Email"></input>
                        <input maxLength={20} onChange={validate} type="password" id="pass" ref={pass} placeholder="Password"></input>
                    </div>
                </form>
                <button onClick={requestLogin} disabled={!valid}>Log in</button>
                <span className="error_text" style={{ display: error ? 'block' : 'none' }}>{errorStatement}</span>
            </div>
            <div className="hr"></div>
            <div className="container_sections flex">
                <Link to="/signup" className="link_text">Don't have an account?</Link>
            </div>
        </div>
    </div>
    </div>
}

export default Login