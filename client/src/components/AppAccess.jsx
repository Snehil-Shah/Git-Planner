import {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Main, DrawerHeader } from '../utils/Navbar.js';
import Tasklist from './Main/TaskList.jsx';
import Homepage from './Main/Homepage.jsx';
import { getGithubProjects } from '../services/projects.js';
import useAlert from '../hooks/Alert.jsx';
import Header from './Nav/Header.jsx'
import SideBar from './Nav/Drawer.jsx';

export default function AppAccess({ setLogoutAlert, manageAuth, credentials }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [project, LoadData] = useState(null)
  const [projectList, setProjects] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // github
  const [githubProjects, setGithubList] = useState([]);

  useEffect(() => {
    getGithubProjects().then((list) => { setGithubList(list); });
  }, [projectList])

  // Alert
  const [successAlert, setSuccessAlert, handleSuccessClose] = useAlert(false)
  const [deleteAlert, setDeleteAlert, handleDeleteClose] = useAlert(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header successAlert={successAlert} deleteAlert={deleteAlert} handleSuccessClose={handleSuccessClose} handleDeleteClose={handleDeleteClose} handleDrawerOpen={handleDrawerOpen} project={project} setLogoutAlert={setLogoutAlert} credentials={credentials} manageAuth={manageAuth} open={open} />
      <SideBar open={open} theme={theme} handleDrawerClose={handleDrawerClose} setSuccessAlert={setSuccessAlert} setDeleteAlert={setDeleteAlert} project={project} LoadData={LoadData} setProjects={setProjects} projectList={projectList} />
      <Main open={open}>
        <DrawerHeader />
        {project ?
          <Tasklist project={project} /> :
          <Homepage setLogoutAlert={setLogoutAlert} setSuccessAlert={setSuccessAlert} githubProjects={githubProjects} projectList={projectList} credentials={credentials} refreshProjectList={setProjects} openDrawer={handleDrawerOpen} logoutCallback={manageAuth} setProject={LoadData} />
        }
      </Main>
    </Box>
  );
}