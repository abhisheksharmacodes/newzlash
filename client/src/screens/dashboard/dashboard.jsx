import { React, useRef, useState, useEffect } from "react"
import { Link, useNavigate  } from "react-router-dom"
import Cookies from 'js-cookie';

import axios from 'axios'

import '../../App.css'
import './dashboard.css'

const Dashboard = (props) => {

    
    let navigate = useNavigate()

    let requestLogOut = () => {
        Cookies.set('loggedIn', 'false', { expires: 7 });
        Cookies.set('email', '', { expires: 7 });
        navigate("/login")
    }

    return <div id="auth_screen" className="screen normal_screen">
        <h1>Dashboard</h1>
        <button onClick={requestLogOut}>Logout</button>
    </div>
}

export default Dashboard