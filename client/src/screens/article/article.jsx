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
    const [loading, setLoading] = useState(true)

    let checkStatus = () => {
        if (localStorage.getItem('loggedIn') == 'false')
            navigate('/login')
    }

    useEffect(() => checkStatus(), [])

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
            .then(data => { setArticle(data.news[0]);setLoading(false) })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }

    useEffect(() => {
        getDataAndFetchNews();
    }, []);


    let requestLogOut = () => {
        localStorage.setItem('loggedIn', 'false');
        localStorage.setItem('email', '');
        navigate("/login")
    }

    let goback = () => {
        navigate('/dashboard')
    }

    let redirect = () => {
        window.location.href = "www.google.come"
        // window.open(article.url)
    }

    function daysAndMonthsSinceTimestamp(timestamp) {
        // Create a Date object from the timestamp string
        const timestampDate = new Date(timestamp);

        // Get today's date
        const today = new Date();

        // Calculate the difference in milliseconds
        const differenceInMs = today.getTime() - timestampDate.getTime();

        // Calculate days
        const daysSpent = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

        // Calculate months (consider incomplete months as 1 month)
        const monthsSpent = Math.floor(daysSpent / 30) + (daysSpent % 30 > 0 ? 1 : 0);

        // Return an object with days and months
        return daysSpent > 365 ? Math.round(daysSpent / 365) + ' years agp' : (daysSpent > 30 ? monthsSpent + ' months ago' : daysSpent + ' days ago')
    }

    const ExpiredMesaage = <p>Your session has expired. Please login again via <a href="https://www.google.com/" target="_blank"> Google</a>.</p>

    return <div id="auth_screen" className="article">
        <div id="container1">
            <div id="header">
                <img onClick={goback} src={back} tyle={{ transform: 'scale(.8)' }} />
                <h1>Newzlash</h1>
                <img onClick={() => { navigate('/user'); localStorage.setItem('stack', 'article') }} src={logout} />
            </div>
            <div id="article">
                {
                    loading ?
                        <div id="loading"></div>
                        : <><img src={article.image} alt="" />
                            <h1>{article.title}</h1>
                            <div id="info">
                                <span>{daysAndMonthsSinceTimestamp(article.publish_date)} by {article.author}</span>
                            </div>
                            <p>{article.text}</p>
                        </>
                }

            </div>
        </div>

    </div>
}

export default Article