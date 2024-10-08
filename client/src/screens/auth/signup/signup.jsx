import { React, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import axios from 'axios'
import Cookies from 'js-cookie'

import logo from '../../../assets/images/logo.png'

import '../../../App.css'
import './signup.css'

const Signup = () => {

    let navigate = useNavigate()

    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [valid, setValid] = useState(false)
    const [error,setError] = useState(false)

    const fname = useRef(null)
    const pass = useRef(null)
    const repass = useRef(null)
    const user_email = useRef(null)
    const checkPass = useRef(null)
    const passMessage = useRef(null)

    const veryWeak_ = useRef(null)
    const Weak_ = useRef(null)
    const Moderate_ = useRef(null)

    let password_strength = () => {

        let password = pass.current.value

        if (password === '') {
            veryWeak_.current.classList = ''
            Weak_.current.classList = ''
            Moderate_.current.classList = ''
            passMessage.current.innerText = "Add Capital and Small letters"
            setValid(false)
            pass.current.classList = 'error'
            return
        }

        if (/[a-zA-Z]/.test(password)) {
            pass.current.classList = 'error'
            setValid(false)
            passMessage.current.innerText = "Add numbers"
            veryWeak_.current.classList = 'green_status'
            Weak_.current.classList = ''
            Moderate_.current.classList = ''
            if (/[0-9]/.test(password)) {
                pass.current.classList = 'error'
                setValid(false)
                passMessage.current.innerText = "Add special characters"
                veryWeak_.current.classList = 'green_status'
                Weak_.current.classList = 'green_status'
                Moderate_.current.classList = ''
                if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#£_()/=+$!%*?&])[A-Za-z\d@#£_()/=+$!%*?&]/.test(password)) {
                    if (pass.current.value === repass.current.value) setValid(true)
                    pass.current.classList = ''
                    passMessage.current.innerText = ""
                    veryWeak_.current.classList = 'green_status'
                    Weak_.current.classList = 'green_status'
                    Moderate_.current.classList = 'green_status'
                }
            }
        }

    }

    let emailValidate = () => {
        if (email.test(user_email.current.value)) {
            setValid(true)
            validate()
            user_email.current.classList = ''
        } else {
            setValid(false)
            user_email.current.classList = 'error'
        }
    }

    let validate = () => {
        if (fname.current.value !== '' && user_email.current.value !== '' && pass.current.value !== '') {
            if (pass.current.value === repass.current.value) {
                repass.current.classList = ''
                setValid(true)
                password_strength()
                return
            } else {
                repass.current.classList = 'error'
                setValid(false)
                password_strength()
                return
            }
        }
        setValid(false)
    }

    let addUser = async () => {
        let user_data = {
            fname: fname.current.value,
            email: user_email.current.value,
            password: pass.current.value,
            niches: []
        }
        axios.post('https://newzlash-api.vercel.app/adduser', user_data).then((data) => {
            localStorage.setItem('id', data.data)
            localStorage.setItem('loggedIn', 'true')
            localStorage.setItem('email', user_email.current.value)
            localStorage.setItem('name', fname.current.value)
            navigate("/niches")
        }).catch((e) => {
            setError(true)
        })
    }

    return <div className="flex"><div id="auth_screen" className="screen signup">
        <div id="container">
            <span className="title">Sign up</span>
            <div className="flex container_sections">
                <form>
                    <div id="" className="flex">
                        <input ref={fname} maxLength={35} placeholder="Name"></input>
                        <div className="normal_flex">
                            <input type="email" ref={user_email} onChange={emailValidate} placeholder="Email"></input>
                        </div>
                        <div className="normal_flex">
                            <input maxLength={20} onChange={validate} onFocus={() => checkPass.current.style.display = 'flex'} onBlur={() => checkPass.current.style.display = 'none'} type="password" id="pass" ref={pass} onInput={password_strength} placeholder="Password"></input>
                            <div ref={checkPass} id="pass_status" className="flex">
                                <div className="password_status">
                                    <div ref={veryWeak_}></div>
                                    <div ref={Weak_}></div>
                                    <div ref={Moderate_}></div>
                                </div>
                                <span className="info_text" ref={passMessage}>Add capital and small letters</span>
                            </div>
                        </div>
                        <input maxLength={20} type="password" id="repass" ref={repass} onInput={validate} placeholder="Re-enter password"></input>
                    </div>
                </form>
                <button disabled={!valid} onClick={addUser}>Sign up</button>
                <span className="error_text" style={{ display: error ? 'block' : 'none' }}>Something went wrong</span>
            </div>
            <div className="hr"></div>
            <div className="container_sections flex">
                <Link to="/login" className="link_text">Already have an account?</Link>
            </div>
        </div> </div></div>
}

export default Signup
