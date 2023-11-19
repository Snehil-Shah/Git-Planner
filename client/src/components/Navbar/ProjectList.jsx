import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CreateProjectForm from './createProjectForm';
import GitHubIcon from '@mui/icons-material/GitHub';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { getProjects } from '../../services/projects';

export default function ProjectList({ setCredentials }) {
    const [selectedIndex, setSelectedIndex] = React.useState({id: null, projectName: null, provider: null});
    const [projectList, setProjects] = React.useState([]);
    React.useEffect(() => {
        setCredentials(selectedIndex);
    }, [selectedIndex, setCredentials])
    React.useEffect(() => {
        getProjects().then((projects) => setProjects(projects))
    }, [])
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    let htmlList = null;
    if (projectList){
        htmlList = projectList.map((project, index) => (
        <ListItemButton
            key={index}
            selected={selectedIndex == project}
            onClick={(event) => handleListItemClick(event, project)}
        >
            {project.provider == 'github' ? <GitHubIcon style={{ marginLeft: 2, marginRight: 8 }} /> : <TaskAltIcon style={{ marginLeft: 2, marginRight: 8 }} fontSize='medium'/>}
            <ListItemText primary={project.projectName} />
        </ListItemButton>
    ))}

    return (
        <>
            <CreateProjectForm refreshProjectList={setProjects}/>
            <List component="nav" aria-label="main mailbox folders">
                {htmlList}
            </List>
        </>
    );
}