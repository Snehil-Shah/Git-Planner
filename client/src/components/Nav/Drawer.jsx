import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProjectList from './ProjectList';
import { DrawerHeader } from '../../utils/Navbar';

export default function SideBar({open, theme, handleDrawerClose, setSuccessAlert, setDeleteAlert, project, LoadData, setProjects, projectList}){
    return(
        <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
        elevation={20}
      >
        <DrawerHeader sx={{ backgroundColor: '#f6f8fa' }}>
          <Button variant='text' sx={{ position: 'absolute', left: 13, color: 'text.secondary' }} disabled={!project} onClick={() => LoadData(null)}><HomeIcon fontSize='medium' sx={{ mr: 0.5 }} /><Typography fontSize='large' variant='button'>Home</Typography></Button>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ mb: 1 }} />
        <ProjectList setSuccessAlert={setSuccessAlert} setDeleteAlert={setDeleteAlert} project={project} setProject={LoadData} setProjects={setProjects} projectList={projectList} />
      </Drawer>
    )
}