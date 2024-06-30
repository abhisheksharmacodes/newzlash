import { React, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

import axios from 'axios'

import '../../App.css'
import './dashboard.css'

const Dashboard = (props) => {

    let navigate = useNavigate()
    const [niches, setNiches] = useState([])
    const [news, setNews] = useState([])

    function getDataAndFetchNews() {
        axios.get('http://localhost:5000/user/' + Cookies.get('id')).then((data) => {
            setNiches(data.data)
        })

        const url = 'https://api.worldnewsapi.com/search-news?text=tesla&language=en';
        const apiKey = 'b7b5392106804c3e96895c7f650a8694';

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
        //     .then(data => setNews(data.news))
        //     .catch(error => console.error('There was a problem with the fetch operation:', error));
    }

    let NewsCard = (props) => <div className="newsCard">
        <img src={props.image} />
        <span>{props.title}</span>
        <p>{props.desc}</p>
    </div>

    useEffect(() => {
        getDataAndFetchNews();
    }, []);

    let requestLogOut = () => {
        Cookies.set('loggedIn', 'false', { expires: 7 });
        Cookies.set('email', '', { expires: 7 });
        navigate("/login")
    }

    return <div id="auth_screen" className="screen normal_screen">
        <h1>Newzlash</h1>
        <div id="news">
            {niches.length > 0 && news.map((a) => <NewsCard image={a.image} title={a.title} desc={a.summary} />)}
        </div>
        <button onClick={requestLogOut}>Logout</button>
    </div>
}

export default Dashboard