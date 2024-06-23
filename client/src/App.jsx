import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'

import Layout from './Layout.jsx'
import Home from './Home.jsx'

import Login from './screens/auth/login/login.jsx'
import Signup from './screens/auth/signup/signup.jsx'

import NoPage from './NoPage.jsx'

let App = () => <GoogleOAuthProvider clientId="612979971826-jrdbs1v0nobdoiuttn5g9f1epnvp2670.apps.googleusercontent.com">
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NoPage />} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
</GoogleOAuthProvider>

export default App
