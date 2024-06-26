import { React, useRef, useState } from "react"
import { Link } from "react-router-dom"

import axios from 'axios'

import '../../App.css'
import './niches.css'

const Cards = (props) => <div className="cards">

</div>

const Niches = (props) => {

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

    return <div class="flex">
        <div id="auth_screen" className="screen">
            <h1>Select niches</h1>
        </div>
    </div>
}

export default Niches