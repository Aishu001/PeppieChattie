import { useState } from 'react'
import LandingPage from './Component/LandingPage'


import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import SignUp from './Component/SignUp'
import './App.css'
import Login from './Component/Login'
import ChatPage from './Component/ChatPage'
import ChatPageDup from './Component/ChatPageDup'
import { Suspense, lazy } from "react";
import Loading from './Component/Laoding'

const SignUpPage = lazy(() => import('./Component/SignUp'));
const LoginPage = lazy(() => import('./Component/Login'));

function App() {
  

  return (
    <>
   
   <Router>
     <Routes>
     <Route path="/" element={<LandingPage/>} />
     <Route path="/signup" element={<Suspense fallback={
    Loading
}><SignUpPage /></Suspense>} />

          <Route path="/login" element={<Suspense fallback={ Loading}><LoginPage /></Suspense>} />
             <Route path ="/chatPage" exact Component={ChatPage} ></Route> 
             <Route path="/chatPageD/:userId" element={<ChatPageDup />} />

            

            </Routes>
     </Router>
    </>
  )
}

export default App
