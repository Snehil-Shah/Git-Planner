import { useState } from "react";
import { ListItem, ListItemText, Link, Divider, Grid, Box, Container, Typography, Card, CardContent, IconButton } from "@mui/material"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoutIcon from '@mui/icons-material/Logout';
import { FixedSizeList } from 'react-window';
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from '@mui/icons-material/Add'
import CreateProjectForm from '../Nav/Project/createProjectForm';
import { logout } from "../../services/users";
import { createProject } from "../../services/projects";

function openGithub(link){
    window.open(link);
}

export default function Homepage({ setLogoutAlert, setSuccessAlert, githubProjects, setProject, logoutCallback, credentials, refreshProjectList, openDrawer, projectList }) {
    const [formOpen, setForm] = useState(false);
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
                <GitHubIcon style={{ marginLeft: 0, marginRight: 10 }} />
                <ListItemText style={{ marginLeft: 2, paddingRight: 67 }} primary={githubProjects[index].name} />
                <IconButton sx={{ position: 'absolute', right: 30 }} onClick={() => window.open(githubProjects[index].link)}>
                    <OpenInNewIcon color='info' />
                </IconButton>
                <IconButton sx={{ position: 'absolute', right: 3 }} onClick={async () => {
                    const newProject = await createProject(githubProjects[index].name, 'github', githubProjects[index].link);
                    refreshProjectList(prevList => [...prevList, newProject])
                    setProject(newProject)
                    setSuccessAlert(true);
                }} disabled={githubProjects[index].alreadyCreated} color='success'>
                    <AddIcon sx={!githubProjects[index].alreadyCreated ? { color: '#1f883d' } : null} />
                </IconButton>
            </ListItem>
        );
    }

    return (
        <Box paddingY='40px' display={"flex"} flexDirection={'column'}>
            <Container maxWidth='lg' sx={{ mb: 5 }}>
                <Typography variant="h2" color="text.primary" sx={{ mx: 22 }}>{`Welcome, ${credentials.name.split(' ')[0]} !`}</Typography>
            </Container>
            <Divider variant='middle' sx={{ width: '65%', alignSelf: 'center' }} />
            <Container maxWidth='md'>
                <Box mt={7}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ p: 2 }} elevation={3}>
                                <CardContent>
                                    <Typography variant="h5">Start</Typography>
                                    <Divider sx={{ my: 3, mb: 5 }} />
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <PlaylistAddIcon sx={{ mr: 1 }} />
                                        <Link href={'projects/new'} onClick={(e) => { e.preventDefault(); handleFormOpen() }} color='text.primary'>
                                            <Typography variant='button' fontSize={17}>New Project</Typography>
                                        </Link>
                                        <CreateProjectForm setSuccessAlert={setSuccessAlert} projectList={projectList} refreshProjectList={refreshProjectList} formOpen={formOpen} handleFormClose={handleFormClose} setProject={setProject} />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <OpenInNewIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Link href={'/projects'} color='text.primary' onClick={(e) => { e.preventDefault(); openDrawer() }}>
                                            <Typography variant='button' fontSize={17}>Open Projects</Typography>
                                        </Link>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <GitHubIcon fontSize='small' sx={{ mr: 1 }} />
                                        <Link href={credentials.link} color='text.primary' onClick={(e) => {e.preventDefault(); openGithub(credentials.link) }} >
                                            <Typography variant='button' fontSize={17}>My Github</Typography>
                                        </Link>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Link href={'/logout'} color='text.primary' onClick={async (evt) => {
                                            evt.preventDefault()
                                            await logout()
                                            logoutCallback(null)
                                            setLogoutAlert(true);
                                        }
                                        }>
                                            <Typography variant='button' fontSize={17}>Logout</Typography>
                                        </Link>
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} padding={0}>
                            <Card sx={{ p: 1, pb: 0 }} elevation={3}>

                                <CardContent sx={{ '&.MuiCardContent-root:last-child': { pb: 0 }, mb: 0 }}>
                                    <Typography variant="h5">Repositories</Typography>
                                    <Divider sx={{ my: 3, mb: 1 }} />
                                    <Box padding={0} paddingLeft={1} sx={{ textAlign: 'center' }}>
                                        {githubProjects.length ?
                                            <FixedSizeList
                                                height={Math.min(githubProjects.length * 50, 250)}
                                                itemSize={46}
                                                itemCount={githubProjects.length}
                                                overscanCount={5}
                                            > {renderRow}
                                            </FixedSizeList> :
                                            <CircularProgress sx={{ mt: 12.8, mb: 14.6, color: 'text.secondary' }} disableShrink size={25} />}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}