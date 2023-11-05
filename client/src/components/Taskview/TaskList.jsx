import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

async function getTasks(projectId) {
  const response = await fetch(`http://localhost:3000/tasks?id=${projectId}`);
  const projectDetails = await response.json();
  return projectDetails;
}

export default function TaskList({ projectId }) {
  const [taskList, setTasks] = React.useState([null]);
  React.useEffect(() => {getTasks(projectId).then((projectDetails) => setTasks(projectDetails))},[projectId]);
  let htmlList = taskList.map((tasks, index) => (<Item key={index}>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemText primary={tasks} />
                                </ListItemButton>
                              </ListItem>
                            </Item>))
  return (
    <Box sx={{ width: '100%' }}>
      <List>
        <Stack spacing={2}>
          {htmlList}
        </Stack>
      </List>
    </Box>
  );
}