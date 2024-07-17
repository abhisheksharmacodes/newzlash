import { React, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

import '../../App.css'
import './user.css'

import cross from '../../assets/images/cross.png'

const User = () => {

    let navigate = useNavigate()

    let checkStatus = () => {
        if (!localStorage.getItem('id'))
            navigate('/login')
    }

    useEffect(() => {
        checkStatus()
    }, [])

    let requestLogOut = () => {
        localStorage.setItem('loggedIn', 'false', { expires: 7 });
        localStorage.setItem('email', '', { expires: 7 });
        localStorage.setItem('id','')
        localStorage.setItem('niches','')
        navigate("/login")
    }

    return <div id="auth_screen" className="">
        <div id="container1" className="our_flex">
            <div id="l1" className="our_flex">
                <img src={cross} onClick={()=>navigate('/dashboard')} alt="" />
            </div>
            <div id="l2" className="our_flex">
                <div id="title" className="our_flex">
                    <span>{localStorage.getItem('name')}</span>
                    <span id="likes">likes</span>
                </div>
                <div id="niches_container" className="our_flex" style={{ flexDirection: 'column' }}>
                    <div id="niches" className="our_flex">
                        {localStorage.getItem('niches').split(",").map((a)=><span>{a}</span>)}
                    </div>
                    <button onClick={()=>navigate('/niches')}>Customize niches</button>
                    <button onClick={requestLogOut} className="secondary_button">Log out</button>
                    <button onClick={()=>navigate('/'+localStorage.getItem('stack'))} id="back" className="secondary_button">Back</button>
                </div>
            </div>
            <div id="l3" className="our_flex">
            </div>

        </div>

    </div>
}

export default User