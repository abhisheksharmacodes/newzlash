import { React, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

import refresh from '../../assets/images/dashboard/refresh.png'
import logout from '../../assets/images/dashboard/logout.png'

import axios from 'axios'

import '../../App.css'
import './dashboard.css'

const Dashboard = () => {
    let storedNiches = localStorage.getItem('niches') ? localStorage.getItem('niches').split(",") : []
    let navigate = useNavigate()
    const [niches, setNiches] = useState(storedNiches)
    const [news, setNews] = useState([])

    let checkStatus = () => {
        if (!Cookies.get('id'))
            navigate('/login')
    }

    useEffect(() => {
        checkStatus()
    }, [])

    let selectTwoNiches = (niches) => {
        let first = Math.floor(Math.random() * (niches.length - 0 + 1)) + 0
        let first_n = niches[first]
        niches.splice(first,1)
    
        let second = (first + 1) % niches.length;
        return first_n + '+' + niches[second]
    }   

    function getDataAndFetchNews() {

        axios.get('http://localhost:5000/user/' + Cookies.get('id')).then((data) => {
            setNiches(data.data)
            localStorage.setItem('niches',data.data)
        })

        const url = `https://api.worldnewsapi.com/search-news?text=${selectTwoNiches(niches)}&language=en`;
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
        //     .then(data => {setNews(data.news)})
        //     .catch(error => console.error('There was a problem with the fetch operation:', error));
    }

    let NewsCard = (props) => <div className="newsCard" onClick={props.open}>
        <img src={props.image}/>
        <span>{props.title}</span>
        {/* <p>{props.desc}</p> */}
    </div>

    useEffect(() => {
        getDataAndFetchNews();
    }, []);

    let goToNiches = () => {
        navigate('/niches')
    }

    let goToUser = () => {
        navigate('/user')
    }

    return <div id="auth_screen" className="screen normal_screen">
        <div id="container1">
            <div id="header">
                <img onClick={goToNiches} src={refresh} />
                <h1 onClick={()=>navigate('/about')}>Newzlash</h1>
                <img onClick={goToUser} src={logout} />
            </div>
            <div id="news">
                {niches.length > 0 && news.map((a) => <NewsCard open={()=>{Cookies.set('newsArticle',a.id);navigate('/article')}} image={a.image} title={a.title} desc={a.summary} />)}
            </div>
        </div>
    </div>
}

export default Dashboard