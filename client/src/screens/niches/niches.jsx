import { React, useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"

import axios from 'axios'

import '../../App.css'
import './niches.css'

const Cards = (props) => <div className="cards">

</div>

const Niches = (props) => {

    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [valid, setValid] = useState(false)
    const [selectedNiches, setSelectedNiches] = useState([])

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



    useEffect(() => {
        console.log(selectedNiches)
    }, [selectedNiches])

    const handleClick = (niche) => {
        const newSelectedNiches = [...selectedNiches]

        let nicheIndex = newSelectedNiches.indexOf(niche)

        if (nicheIndex !== -1) { // Niche already selected, remove it
            newSelectedNiches.splice(nicheIndex, 1);
        } else { // Niche not selected, add it
            newSelectedNiches.push(niche);
        }

        setSelectedNiches(newSelectedNiches)

    }

    return <div id="auth_screen" className="screen normal_screen">
        <h1>Select niches</h1>
        <div id="niches_container">
            <div className={`niches ${selectedNiches.includes('Technology') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Technology')}>Technology</div>
            <div className={`niches ${selectedNiches.includes('Education') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Education')}>Education</div>
            <div className={`niches ${selectedNiches.includes('Gaming') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Gaming')}>Gaming</div>
            <div className={`niches ${selectedNiches.includes('Health') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Health')}>Health</div>
            <div className={`niches ${selectedNiches.includes('Environment') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Environment')}>Environment</div>
            <div className={`niches ${selectedNiches.includes('Economy') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Economy')}>Economy</div>
            <div className={`niches ${selectedNiches.includes('Business') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Business')}>Business</div>
            <div className={`niches ${selectedNiches.includes('Fashion') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Fashion')}>Fashion</div>
            <div className={`niches ${selectedNiches.includes('Art') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Art')}>Art</div>
            <div className={`niches ${selectedNiches.includes('Entertainment') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Entertainment')}>Entertainment</div>
            <div className={`niches ${selectedNiches.includes('Sport') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Sport')}>Sport</div>
            <div className={`niches ${selectedNiches.includes('Legal') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Legal')}>Legal</div>
            <div className={`niches ${selectedNiches.includes('World') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('World')}>World</div>
            <div className={`niches ${selectedNiches.includes('India') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('India')}>India</div>
            <div className={`niches ${selectedNiches.includes('Politics') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Politics')}>Politics</div>
            <div className={`niches ${selectedNiches.includes('Lifestyle') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Lifestyle')}>Lifestyle</div>
            <div className={`niches ${selectedNiches.includes('Science') ? 'niches_selected' : ''}`}
                onClick={() => handleClick('Science')}>Science</div>
        </div>
        <button style={{width:'150px'}}>Next</button>
    </div>
}

export default Niches