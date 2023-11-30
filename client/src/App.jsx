import { useState, useEffect, forwardRef } from 'react'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'
import { fetchCredentials } from "./services/users";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

function App() {
  const [credentials, setAuthentication] = useState();
  useEffect(function(){
    fetchCredentials().then((User)=>setAuthentication(User));
  },[]);

  // Logout Alert
  const [logoutAlert, setLogoutAlert] = useState(false);

  const handleLogoutClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLogoutAlert(false);
  };

  return (
    <>
      <Snackbar open={logoutAlert} autoHideDuration={6000} onClose={handleLogoutClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ mt: 8 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} onClose={handleLogoutClose} severity="error" variant='filled' sx={{ width: '50vh' }}>
            Logged Out Successfully!
          </Alert>
        </Snackbar>
      {credentials ? <Navbar setLogoutAlert={setLogoutAlert} manageAuth ={setAuthentication} credentials={credentials}/> : <Login/>}
    </>
  )
}

export default App
