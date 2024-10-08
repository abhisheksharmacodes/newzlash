import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'

import Layout from './Layout.jsx'
import Home from './Home.jsx'

import Login from './screens/auth/login/login.jsx'
import Signup from './screens/auth/signup/signup.jsx'

import Niches from './screens/niches/niches.jsx'
import Dashboard from './screens/dashboard/dashboard.jsx'
import Article from './screens/article/article.jsx'
import User from './screens/user/user.jsx'
import About from './screens/about/about.jsx'

import NoPage from './NoPage.jsx'

let App = () => <>
  <HashRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/niches" element={<Niches />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/article" element={<Article />} />      
      <Route path="/user" element={<User />} />
      <Route path="/about" element={<About />} />
      <Route path="/*" element={<NoPage />} />
      <Route path="/" element={<Home />} />
      </Routes>
  </HashRouter>
</>

export default App
