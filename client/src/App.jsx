import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'

import Layout from './Layout.jsx'
import Home from './Home.jsx'

import Login from './screens/auth/login/login.jsx'
import Signup from './screens/auth/signup/signup.jsx'

import NoPage from './NoPage.jsx'

let App = () => <>
  <HashRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<NoPage />} />
      <Route path="/" element={<Home />} />
      </Routes>
  </HashRouter>
</>

export default App
