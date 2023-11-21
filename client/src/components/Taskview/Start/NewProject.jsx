import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import { TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FixedSizeList } from 'react-window';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getReposList, getProjects, submitCreateProjectForm } from '../../../services/projects';
import {Link, Typography} from '@mui/material'

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

export default function CreateProjectForm({ refreshProjectList }) {
    const [formOpen, setForm] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [githubProjects, setGithubList] = useState([]);

    useEffect(() => {
        githubList().then((list) => { setGithubList(list); });
    }, [formOpen])

    const handleFormOpen = () => {
        setForm(true);
    };

    const handleFormClose = () => {
        setForm(false);
    };

    function renderRow(props) {
        const { index, style } = props;
        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton onClick={!(githubProjects[index].alreadyCreated) ? async () => {
                    refreshProjectList(prevList => [...prevList, { projectName: githubProjects[index].name, repoLink: githubProjects[index].link, provider: 'github' }])
                    setForm(false);
                    await submitCreateProjectForm(githubProjects[index].name, 'github', githubProjects[index].link);
                } : null} disabled={githubProjects[index].alreadyCreated}>
                    <GitHubIcon style={{ marginLeft: 1.5, marginRight: 10 }} />
                    <ListItemText style={{ marginLeft: 2 }} primary={githubProjects[index].name} />
                    {!githubProjects[index].alreadyCreated ? <AddIcon sx={{ position: 'absolute', right: 12 }} color='primary' /> : null}
                </ListItemButton>
            </ListItem>
        );
    }

    return (
        <>
            <Link href={'#'} onClick={handleFormOpen} color='text.primary'>
                <Typography variant='button' fontSize={17}>New Project</Typography>
            </Link>
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
                <Box sx={{ mx: 3 }}>
                    <Button onClick={async () => {
                        refreshProjectList(prevList => [...prevList, { projectName: projectName, provider: 'user' }])
                        setForm(false);
                        await submitCreateProjectForm(projectName, 'user');
                    }
                    } color="primary" variant='contained' fullWidth disableElevation sx={{ mb: 2 }}>
                        Create
                    </Button>
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