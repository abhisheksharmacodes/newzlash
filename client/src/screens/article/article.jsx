import { React, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

import refresh from '../../assets/images/dashboard/refresh.png'
import logout from '../../assets/images/dashboard/logout.png'

import axios from 'axios'

import '../../App.css'
import './article.css'

const Article = () => {

    let navigate = useNavigate()

    let clean = (a) => a.replaceAll("<(.|\n)*?>" , "").replaceAll("&nbsp;" , " ").replaceAll("&amp;" , "&")

    function getDataAndFetchNews() {

        // const url = `https://api.worldnewsapi.com/search-news?text=${selectTwoNiches(niches)}&language=en`;
        // const apiKey = 'b7b5392106804c3e96895c7f650a8694';

        // fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'x-api-key': apiKey
        //     }
        // }).then(response => {
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! Status: ${response.status}`);
        //     }
        //     return response.json();
        // })
        //     .then(data => {setNews(data.news);console.log(data.news)})
        //     .catch(error => console.error('There was a problem with the fetch operation:', error));
    }

    useEffect(() => {
        getDataAndFetchNews();
    }, []);


    let requestLogOut = () => {
        Cookies.set('loggedIn', 'false', { expires: 7 });
        Cookies.set('email', '', { expires: 7 });
        navigate("/login")
    }

    return <div id="auth_screen" className="screen normal_screen">
        <div id="container1">
            <div id="header">
                <img onClick={getDataAndFetchNews} src={refresh} />
                <h1>Newzlash</h1>
                <img onClick={requestLogOut} src={logout} />
            </div>
            <div id="article">
                <img src={"https://images.tv9hindi.com/wp-content/uploads/2024/06/pm-modi-team-india.jpeg?w=670&ar=16:9"} alt="" />
                <h1>Mann Ki Baat: Congratulate people for reposing faith in Constitution, democratic systems: PM Modi</h1>
            </div>
        </div>

    </div>
}

export default Article