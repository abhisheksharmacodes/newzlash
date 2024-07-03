import React from "react";
import Cookies from 'js-cookie';

import Article from "./screens/article/article";
import Login from "./screens/auth/login/login";
import Dashboard from "./screens/dashboard/dashboard";
import Niches from './screens/niches/niches'

const Home = () => <Dashboard></Dashboard> // Cookies.get('loggedIn') === 'true' ? <Dashboard /> : <Login />

export default Home;