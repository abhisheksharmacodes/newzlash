import React from "react";
import Cookies from 'js-cookie';

import Article from "./screens/article/article";
import Login from "./screens/auth/login/login";
import Dashboard from "./screens/dashboard/dashboard";

const Home = () => Cookies.get('loggedIn') === 'true' ? <Dashboard /> : <Login />

export default Home;