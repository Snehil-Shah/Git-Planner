import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login'
import { checkAuth } from "./services/users";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(function(){
    checkAuth().then((isUser)=>setIsAuthenticated(isUser));
  },[]);
  return (
    <>
      {isAuthenticated ? <Navbar/> : <Login setAuthentication = {setIsAuthenticated}/>}
    </>
  )
}

export default App
