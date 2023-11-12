import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CreateTaskForm from './createTask';
import { getTasks } from '../../services/tasks';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask } from '../../services/tasks';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TaskList({ projectId }) {
  const [taskList, setTasks] = React.useState([{_id: null, task: null}]);
  React.useEffect(() => { getTasks(projectId).then((projectTasks) => setTasks(projectTasks)) }, [projectId]);
  // HACK: Make this a separate item component and organize them in some folder like utils or smth
  let htmlList = taskList.map((tasks) => (<Item key={tasks['_id']}>
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={tasks.task} />
      </ListItemButton>
      <IconButton aria-label="delete" size="medium" onClick={async () => {
        await deleteTask(projectId, tasks['_id']);
        getTasks(projectId).then((projectTasks) => setTasks(projectTasks));
      }}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  </Item>))
  return (
    <Box sx={{ width: '100%' }}>
      <List>
        <Stack spacing={2}>
          {htmlList}
        </Stack>
      </List>
      <CreateTaskForm projectId={projectId} refreshTaskList={setTasks} />
    </Box>
  );
}