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
import { Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { drawerWidth, Main, AppBar, DrawerHeader } from '../../utils/Navbar';
import Tasklist from '../Taskview/TaskList';
import ProjectList from './ProjectList';

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [credentials, LoadData] = React.useState({id: null, projectName: null, provider: null, repoLink: null})



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
          {credentials.provider == 'github' ? <Button color="inherit" variant='text' sx={{position: 'absolute', right:10}} onClick={
            ()=> { window.open(credentials.repoLink)}
          }>Repository <OpenInNewIcon sx={{ml:0.7}}/></Button> : null }
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <p style={{ position: 'absolute', left: 0 }}>hello</p>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ProjectList setCredentials={LoadData} />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Tasklist project={credentials} />
      </Main>
    </Box>
  );
}