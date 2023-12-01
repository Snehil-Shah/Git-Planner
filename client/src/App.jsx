import { useState, useEffect} from 'react'
import AppAccess from './components/AppAccess'
import Login from './components/Login'
import Snackbar from '@mui/material/Snackbar'
import CheckIcon from '@mui/icons-material/Check'
import { fetchCredentials } from "./services/users";
import useAlert from './hooks/Alert'
import Alert from './components/utils/Alert'

function App() {
  const [credentials, setAuthentication] = useState();
  useEffect(function(){
    fetchCredentials().then((User)=>setAuthentication(User));
  },[]);

  // Logout Alert
  const [logoutAlert, setLogoutAlert, handleLogoutClose] = useAlert(false);

  return (
    <>
      <Snackbar open={logoutAlert} autoHideDuration={6000} onClose={handleLogoutClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ mt: 8 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} onClose={handleLogoutClose} severity="error" variant='filled' sx={{ width: '50vh' }}>
            Logged Out Successfully!
          </Alert>
        </Snackbar>
      {credentials ? <AppAccess setLogoutAlert={setLogoutAlert} manageAuth ={setAuthentication} credentials={credentials}/> : <Login/>}
    </>
  )
}

export default App
