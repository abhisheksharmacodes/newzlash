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
    const [loading,setLoading] = useState(true)

    let checkStatus = () => {
        if (!localStorage.getItem('id'))
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

        axios.get('https://newzlash-api.vercel.app/user/' + localStorage.getItem('id')).then((data) => {
            setNiches(data.data)
            localStorage.setItem('niches',data.data)
        })

        const url = `https://api.worldnewsapi.com/search-news?text=${selectTwoNiches(niches)}&language=en`;
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
            .then(data => {setNews(data.news);setLoading(false)})
            .catch(error => null);
    }

    let NewsCard = (props) => <div className="newsCard" onClick={props.open}>
        <img src={props.image}/>
        <span>{props.title}</span>
    </div>

    useEffect(() => {
        getDataAndFetchNews();
    }, []);

    let goToNiches = () => {
        navigate('/niches')
    }

    let goToUser = () => {
        navigate('/user')
        localStorage.setItem('stack','dashboard')
    }

    return <div id="auth_screen" className="screen normal_screen" style={{height:'100%'}}>
        
        <div id="container1" style={{width:'100%',marginLeft:'0'}}>
            <div id="header">
                <img onClick={goToNiches} style={{transform:'scale(.87)'}} src={refresh} />
                <h1 onClick={()=>navigate('/about')}>Newzlash</h1>
                <img onClick={goToUser} src={logout} />
            </div>
            <div id="news">
                {
                    loading ? 
                    <div id="loading"></div>
                    :
                    niches.length > 0 && news.map((a) => <NewsCard open={()=>{Cookies.set('newsArticle',a.id);navigate('/article')}} image={a.image} title={a.title} desc={a.summary} />)
                }
            </div>
        </div>
    </div>
}

export default Dashboard