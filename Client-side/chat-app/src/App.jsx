import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './Component/LandingPage'
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
   <Router>
     <Routes>
     <Route path="/" element={<LandingPage/>} />
              <Route path ="/signup" exact Component={SignIn} ></Route>
              {/* <Route path ="/login" exact Component={Login} ></Route>   
              <Route path ="/dashboard" exact Component={Dashboard} ></Route>    
              <Route path ="/contact" exact Component={Contact} ></Route>  
              <Route path ="/AddContact" exact Component={AddContact} ></Route>    
              <Route path ="/UpdateContact/:id" exact Component={EditContact} ></Route> 
              <Route path ="/campaign" exact Component={Campaign} ></Route> 
              <Route path ="/plan" exact Component={Plan} ></Route> 
              <Route path="/paymentMode/:title/:price" exact Component={Payment} /> */}


            </Routes>
     </Router>
    </>
  )
}

export default App
