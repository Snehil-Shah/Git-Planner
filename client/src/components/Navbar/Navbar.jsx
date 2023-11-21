import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { drawerWidth, Main, AppBar, DrawerHeader } from '../../utils/Navbar';
import Tasklist from '../Taskview/TaskList';
import ProjectList from './ProjectList';
import ProfileIcon from './Profile';
import Homepage from '../Taskview/Homepage';

export default function Navbar({ manageAuth, credentials }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [project, LoadData] = React.useState(null)
  const [projectList, setProjects] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
              Git-Planner
            </Typography>
            {project && project.provider == 'github' ? <IconButton color="inherit" variant='text' onClick={
              () => { window.open(project.repoLink) }
            }><OpenInNewIcon /></IconButton> : null}
          </Toolbar>
          <ProfileIcon credentials={credentials} logoutCallback={manageAuth} />
        </Box>
      </AppBar>
      <Drawer //TODO: Increase size of drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <p style={{ position: 'absolute', left: 0 }}></p>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ProjectList setProject={LoadData} setProjects={setProjects} projectList={projectList} />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {project ?
          <Tasklist project={project} /> :
          <Homepage credentials={credentials} refreshProjectList={setProjects} openDrawer={handleDrawerOpen} logoutCallback={manageAuth}/>
        }
      </Main>
    </Box>
  );
}