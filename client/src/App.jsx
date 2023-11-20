import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login'
import { fetchCredentials } from "./services/users";

// TODO: Add tooltips in a lot of places
// FIXME: Make client side authentication checks more robust

function App() {
  const [credentials, setAuthentication] = useState();
  useEffect(function(){
    fetchCredentials().then((User)=>setAuthentication(User));
  },[]);
  return (
    <>
      {credentials ? <Navbar manageAuth ={setAuthentication} credentials={credentials}/> : <Login/>}
    </>
  )
}

export default App
