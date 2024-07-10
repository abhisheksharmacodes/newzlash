import React from "react";
import Cookies from 'js-cookie';

import Login from "./screens/auth/login/login";
import Dashboard from "./screens/dashboard/dashboard";
import About from "./screens/about/about";

const Home = () => <About></About> // Cookies.get('loggedIn') === 'true' ? <Dashboard /> : <Login />

export default Home;