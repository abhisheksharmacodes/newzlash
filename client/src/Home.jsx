import React from "react";
import Cookies from 'js-cookie';

import Login from "./screens/auth/login/login";
import Dashboard from "./screens/dashboard/dashboard";


const Home = () => Cookies.get('id') ? <Dashboard /> : <Login />

export default Home;