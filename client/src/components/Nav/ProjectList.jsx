import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CreateProjectForm from './Project/createProjectForm';
import GitHubIcon from '@mui/icons-material/GitHub';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { getProjects } from '../../services/projects';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteMenu from './Project/deleteProject';

export default function ProjectList({ setDeleteAlert,setSuccessAlert, project, projectList, setProjects, setProject }) {
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [projectContextMenu, setProjectContext] = React.useState(null);
    React.useEffect(() => {
        setProject(selectedIndex);
    }, [selectedIndex, setProject])
    React.useEffect(() => { setSelectedIndex(project) }, [project])
    React.useEffect(() => {
        getProjects().then((projects) => setProjects(projects))
    }, [setProjects])
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const [formOpen, setForm] = React.useState(false);
    const handleFormOpen = () => {
        setForm(true);
    };
    const handleFormClose = () => {
        setForm(false);
    };

    // Delete Menu
    const [menuPosition, setMenuPosition] = React.useState(null);

    let htmlList = null;
    if (projectList) {
        htmlList = projectList.map((project, index) => (
            <ListItemButton
                key={index}
                selected={selectedIndex == project}
                onClick={(event) => handleListItemClick(event, project)}
                onContextMenu={(event) => {
                    event.preventDefault();
                    setProjectContext(project)
                    setMenuPosition({
                        top: event.clientY,
                        left: event.clientX,
                    });
                }}
                sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#f6f8fa',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: 'rgba(9, 7, 5, 0.04)'
                      }
                  }}
            >
                {project.provider == 'github' ? <GitHubIcon style={{ marginLeft: 2, marginRight: 8 }} /> : <TaskAltIcon style={{ marginLeft: 2, marginRight: 8 }} fontSize='medium' />}
                <ListItemText primary={project.projectName} />
            </ListItemButton>
        ))
    }

    return (
        <>
            <Button variant="contained" disableElevation color='success' style={{
                position: "relative", margin: "5%"
            }} sx={{backgroundColor:'#1f883d', '&:hover':{backgroundColor:'success'}}} onClick={handleFormOpen}>
                <AddIcon />Project
            </Button>
            <CreateProjectForm setSuccessAlert={setSuccessAlert} projectList={projectList} refreshProjectList={setProjects} formOpen={formOpen} handleFormClose={handleFormClose} setProject={setProject} />
            <List component="nav" aria-label="main mailbox folders">
                {htmlList}
            </List>
            <DeleteMenu setDeleteAlert={setDeleteAlert} setProject={setProject} project={project} projectToDelete={projectContextMenu} menuPosition={menuPosition} setMenuPosition={setMenuPosition} refreshProjectList={setProjects}/>
        </>
    );
}