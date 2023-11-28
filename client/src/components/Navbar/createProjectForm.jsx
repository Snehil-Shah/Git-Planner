import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import { TextField, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FixedSizeList } from 'react-window';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getReposList, getProjects, createProject } from '../../services/projects';

async function githubList() {
    const repoList = await getReposList();
    const projectList = await getProjects();
    const projectNames = projectList.map(project => project.projectName);
    return repoList.map((gitProject) => ({
        name: gitProject.name,
        link: gitProject.repoLink,
        alreadyCreated: projectNames.includes(gitProject.name)
    }))
}

export default function CreateProjectForm({ setSuccessAlert, setProject, refreshProjectList, formOpen, handleFormClose, projectList }) {
    const [projectName, setProjectName] = useState('');
    const [githubProjects, setGithubList] = useState([]);
    const [creatingProject, startCreatingProj] = useState(false);

    useEffect(() => {
        githubList().then((list) => { setGithubList(list); });
    }, [projectList])

    function renderRow(props) {
        const { index, style } = props;
        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton onClick={!(githubProjects[index].alreadyCreated) ? async () => {
                    const newProject = await createProject(githubProjects[index].name, 'github', githubProjects[index].link);
                    refreshProjectList(prevList => [...prevList, newProject])
                    setProject(newProject)
                    handleFormClose();
                    setSuccessAlert(true);
                } : null} disabled={githubProjects[index].alreadyCreated}>
                    <GitHubIcon style={{ marginLeft: 1.5, marginRight: 10 }} />
                    <ListItemText style={{ marginLeft: 2, paddingRight: 25 }} primary={githubProjects[index].name} />
                    {!githubProjects[index].alreadyCreated ? <AddIcon sx={{ position: 'absolute', right: 12, color: '#1f883d' }} /> : null}
                </ListItemButton>
            </ListItem>
        );
    }

    return (
        <>
            <Dialog open={formOpen} onClose={handleFormClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleFormClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Project"
                        type="text"
                        fullWidth
                        onChange={(evt) => { setProjectName(evt.target.value) }}
                    />
                </DialogContent>
                <Box sx={{ mx: 3, textAlign: 'center' }}>
                    {creatingProject ?
                        <CircularProgress sx={{ mb: 1, color: 'text.secondary' }} disableShrink size={25} /> :
                        <Button onClick={async () => {
                            startCreatingProj(true);
                            const newProject = await createProject(projectName, 'user');
                            refreshProjectList(prevList => [...prevList, newProject])
                            setProject(newProject)
                            handleFormClose();
                            setSuccessAlert(true);
                            startCreatingProj(false);
                        }
                        } variant='contained' color='success' fullWidth disableElevation sx={{ mb: 2, backgroundColor: '#1f883d' }}>
                            Create
                        </Button>}
                </Box>
                <Divider variant='middle' />
                <Box sx={{ mt: 2, mx: 2 }}>
                    <FixedSizeList
                        height={Math.min(githubProjects.length * 50, 300)}
                        itemSize={46}
                        itemCount={githubProjects.length}
                        overscanCount={5}
                    > {renderRow}
                    </FixedSizeList>
                </Box>
            </Dialog>
        </>
    )
}