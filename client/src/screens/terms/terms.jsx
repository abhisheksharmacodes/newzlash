import { React, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

import '../../App.css'
import './Terms.css'

import cross from '../../assets/images/cross.png'

const Terms = () => {

    let navigate = useNavigate()

    let navigateToPrevious = () => {
    }

    return <div id="auth_screen" className="">
        <div id="container1" className="our_flex">
            <div id="l1" className="our_flex">
                <img src={cross} onClick={()=>navigate('/dashboard')} alt="" />
            </div>
            <div id="l2" className="our_flex">
                <div id="title" className="our_flex">
                    <span>Newzlash</span>
                </div>
                <div id="niches_container" className="our_flex" style={{ flexDirection: 'column' }}>
                    <div id="Terms_info" className="our_flex">
                        In an age of information overload, staying informed on specific sustainability issues can be a challenge. Newzlash addresses this by providing a user-centric news aggregation platform. We curate content tailored to your chosen sustainability niche, empowering you to make informed decisions within your area of interest.  By filtering out extraneous information, Newzlash fosters a streamlined and efficient news experience, allowing you to delve deeper into the subjects that matter most.
                    </div>
                </div>
            </div>
            <footer>
                <span>Privacy Policy</span>
                <span>Terms & Conditions</span>
            </footer>

        </div>

    </div>
}

export default Terms