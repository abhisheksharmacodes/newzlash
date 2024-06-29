import { React, useRef, useState } from "react"
import { Link, useNavigate  } from "react-router-dom"

import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

import '../../../App.css'
import './signup.css'

import google from '../../../assets/images/signup/Google.svg'

const Signup = (props) => {

    let navigate = useNavigate()

    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [valid, setValid] = useState(false)

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
        if (fname.current.value !== '' && lname.current.value !== '' && user_email.current.value !== '' && pass.current.value !== '') {
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
            lname: lname.current.value,
            email: user_email.current.value,
            password: pass.current.value,
            action_plan: [],
            task_channels: [],
            daily: {},
            today: {}
        }
        axios.post('https://newzlash-api.vercel.app/users/adduser', user_data).then(() => {
            navigate("/niches")
        }).catch((e)=> {
            alert(e)
        })
    }

    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => alert(tokenResponse),
    // });

    return <div class="flex"><div id="auth_screen" className="screen">

        <div id="container" style={{ display: props.classNameContainer }}>
            <span className="title">Sign up</span>
            <div className="flex container_sections">
                <form>
                    <div id="" className="flex">
                        <input ref={fname} maxLength={20} placeholder="First name"></input>
                        <input ref={lname} maxLength={20} placeholder="Last name"></input>
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
            </div>
            <div className="hr"></div>
            {/* <div className="container_sections flex signup_opts">
                <div className="icon_button" onClick={login}>
                    <img className="signin_icons" src={google}></img>
                    Sign up using Google
                </div>
            </div> */}
            <div className="container_sections flex">
            <Link to="/login" className="link_text">Already have an account? Log in.</Link>
            </div>
        </div> </div></div>
}

export default Signup
