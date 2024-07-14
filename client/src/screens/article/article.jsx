import { React, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

import back from '../../assets/images/dashboard/back.png'
import logout from '../../assets/images/dashboard/logout.png'

import '../../App.css'
import './article.css'

const Article = () => {

    let navigate = useNavigate()

    const [article, setArticle] = useState({})

    let checkStatus = () => {
        if (Cookies.get('loggedIn') == 'false')
            navigate('/login')
    }

    useEffect(()=>checkStatus(),[])

    let clean = (a) => a.replaceAll("<(.|\n)*?>", "").replaceAll("&nbsp;", " ").replaceAll("&amp;", "&")

    function getDataAndFetchNews() {

        const url = `https://api.worldnewsapi.com/retrieve-news?ids=${Cookies.get('newsArticle')}`;
        const apiKey = 'b7b5392106804c3e96895c7f650a8694';

        fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
            .then(data => {setArticle(data.news[0])})
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }

    useEffect(() => {
        getDataAndFetchNews();
    }, []);


    let requestLogOut = () => {
        Cookies.set('loggedIn', 'false', { expires: 7 });
        Cookies.set('email', '', { expires: 7 });
        navigate("/login")
    }

    let goback = () => {
        navigate('/dashboard')
    }

    let redirect = () => {
        window.location.href = "www.google.come"
        // window.open(article.url)
    }

    const ExpiredMesaage = <p>Your session has expired. Please login again via <a href="https://www.google.com/" target="_blank"> Google</a>.</p>

    return <div id="auth_screen" className="">
        <div id="container1">
            <div id="header">
                <img onClick={goback} src={back} />
                <h1>Newzlash</h1>
                <img onClick={requestLogOut} src={logout} />
            </div>
            <div id="article">
                <img src={article.image} alt="" />
                <h1>{article.title}</h1>
                <p>{article.text}</p>
                <p>by <span id="able">{article.author}</span></p>
            </div>
        </div>

    </div>
}

export default Article