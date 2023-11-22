import { useState, useEffect } from "react";
import { ListItem, ListItemText, Link, Divider, Grid, Box, Container, Typography, Card, CardContent, IconButton } from "@mui/material"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoutIcon from '@mui/icons-material/Logout';
import { FixedSizeList } from 'react-window';
import AddIcon from '@mui/icons-material/Add'
import { getReposList, getProjects } from '../../services/projects';
import CreateProjectForm from '../Navbar/createProjectForm';
import { logout } from "../../services/users";
import { createProject } from "../../services/projects";
//TODO: Organize imports

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

export default function Homepage({logoutCallback, credentials, refreshProjectList, openDrawer }) {
    const [formOpen, setForm] = useState(false);
    const [githubProjects, setGithubList] = useState([]);
    const [ref, refresh] = useState(0)

    useEffect(() => {
        refresh(0)
        githubList().then((list) => { setGithubList(list); });
    }, [ref])

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
                    <ListItemText style={{ marginLeft: 2 }} primary={githubProjects[index].name} />
                    <IconButton sx={{ position: 'absolute', right: 30 }} onClick={() => window.open(githubProjects[index].link)}>
                        <OpenInNewIcon  color='text.secondary' />
                    </IconButton>
                    <IconButton sx={{ position: 'absolute', right:3 }} onClick={ async () => {
                    refreshProjectList(prevList=>[...prevList, {projectName: githubProjects[index].name, repoLink: githubProjects[index].link, provider: 'github'}])
                    refresh(1)
                    await createProject(githubProjects[index].name, 'github', githubProjects[index].link);
                }} disabled={githubProjects[index].alreadyCreated}>
                        <AddIcon  color={!githubProjects[index].alreadyCreated? 'primary' : 'text.secondary'} />
                    </IconButton>
            </ListItem>
        );
    }

    return (
        <Box paddingY='40px' display={"flex"} flexDirection={'column'}>
            <Container maxWidth='lg' sx={{ mx: 30, mb: 5 }}>
                <Typography variant="h2" color="text.primary">{`Welcome, ${credentials.name.split(' ')[0]} !`}</Typography>
            </Container>
            <Divider variant='middle' sx={{ width: '65%', alignSelf: 'center' }} />
            <Container maxWidth='md'>
                <Box mt={7}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ p: 2 }}>
                                <CardContent>
                                    <Typography variant="h5">Start</Typography>
                                    <Divider sx={{ my: 3, mb: 5 }} />
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <PlaylistAddIcon sx={{ mr: 1 }} />
                                        <Link href={'#'} onClick={handleFormOpen} color='text.primary'>
                                            <Typography variant='button' fontSize={17}>New Project</Typography>
                                        </Link>
                                        <CreateProjectForm refreshProjectList={refreshProjectList} formOpen={formOpen} handleFormClose={handleFormClose} />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <OpenInNewIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Link href={'#'} color='text.primary' onClick={openDrawer}>
                                            <Typography variant='button' fontSize={17}>Open Projects</Typography>
                                        </Link>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <GitHubIcon fontSize='small' sx={{ mr: 1 }} />
                                        <Link href={'#'} color='text.primary' onClick={() => { window.open(credentials.link) }} >
                                            <Typography variant='button' fontSize={17}>My Github</Typography>
                                        </Link>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Link href={'#'} color='text.primary' onClick={async () => {
                                            await logout()
                                            logoutCallback(null)
                                        }
                                        }>
                                            <Typography variant='button' fontSize={17}>Logout</Typography>
                                        </Link>
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} padding={0}>
                            <Card sx={{ p: 1, pb: 0 }}>
                                (// BUG: Add loading screen for this card)
                                <CardContent sx={{ '&.MuiCardContent-root:last-child': { pb: 0 }, mb: 0 }}>
                                    <Typography variant="h5">Repositories</Typography>
                                    <Divider sx={{ my: 3, mb: 1 }} />
                                    <Box padding={0}>
                                        <FixedSizeList
                                            height={Math.min(githubProjects.length * 50, 250)}
                                            itemSize={46}
                                            itemCount={githubProjects.length}
                                            overscanCount={5}
                                        > {renderRow}
                                        </FixedSizeList>
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