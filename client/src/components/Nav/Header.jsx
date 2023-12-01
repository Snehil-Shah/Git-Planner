import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Snackbar from '@mui/material/Snackbar'
import Alert from '../utils/Alert'
import AlertTitle from '@mui/material/AlertTitle';
import CheckIcon from '@mui/icons-material/Check'
import ProfileIcon from './Profile';
import {AppBar} from '../../utils/Navbar'

export default function Header({successAlert, deleteAlert, handleSuccessClose, handleDeleteClose, handleDrawerOpen, project, setLogoutAlert, credentials, manageAuth, open}) {
    return (
        <AppBar position="fixed" open={open} sx={{ backgroundColor: '#24292f' }} elevation={4}>
            <Snackbar open={successAlert} autoHideDuration={7000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ mt: 8 }}>
                <Alert icon={<CheckIcon fontSize="inherit" />} onClose={handleSuccessClose} severity="success" sx={{ width: '100vh' }}>
                    <AlertTitle>Project Created Successfully</AlertTitle>
                    Get Started by Clicking the  <b>+</b>  icon to Create your First Task Now!
                </Alert>
            </Snackbar>
            <Snackbar open={deleteAlert} autoHideDuration={4000} onClose={handleDeleteClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ mt: 8 }}>
                <Alert icon={<CheckIcon fontSize="inherit" />} onClose={handleDeleteClose} severity="error" sx={{ width: '80vh' }}>
                    <AlertTitle>Deleted!</AlertTitle>
                    The Project and its Tasks were <b>Permanently</b> Deleted!
                </Alert>
            </Snackbar>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {project ? project.projectName : 'Git-Planner'}
                    </Typography>
                    {project && project.provider == 'github' ? <IconButton color="inherit" variant='text' onClick={
                        () => { window.open(project.repoLink) }
                    }><OpenInNewIcon /></IconButton> : null}
                </Toolbar>
                <img src="/favicon.ico" width='65' height='65' style={{ filter: 'invert(1)', position: 'fixed', left: '47.5vw' }} />
                <ProfileIcon setLogoutAlert={setLogoutAlert} credentials={credentials} logoutCallback={manageAuth} />
            </Box>
        </AppBar>
    )
}