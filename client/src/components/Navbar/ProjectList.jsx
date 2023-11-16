import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CreateProjectForm from './createProjectForm';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getProjects } from '../../services/projects';

export default function ProjectList({ setCredentials }) {
    const [selectedIndex, setSelectedIndex] = React.useState('0');
    const [projectList, setProjects] = React.useState([{id: null, projectName: null, provider: null}]);
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
            selected={selectedIndex == project.id}
            onClick={(event) => handleListItemClick(event, project.id)}
        >
            {project.provider == 'github'? <GitHubIcon style={{ marginLeft: 2, marginRight: 8 }} /> : null}
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