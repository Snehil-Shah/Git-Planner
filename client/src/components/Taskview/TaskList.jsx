import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateTaskForm from './createTask';
import { getTasks } from '../../services/tasks';
import AdjustIcon from '@mui/icons-material/Adjust';
import { deleteTask } from '../../services/tasks';
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material';

export default function TaskList({ project }) {
  const [taskList, setTasks] = React.useState([{ _id: null, task: null, description: null, githubIssue: null }]);
  React.useEffect(() => { getTasks(project.id).then((projectTasks) => setTasks(projectTasks)) }, [project.id]);
  // HACK: Make this a separate item component and organize them in some folder like utils or smth
  let htmlList = taskList.map((task) => (
    <Accordion key={task['_id']} sx={{ display: 'flex', flexDirection: 'column' }}>

      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant='body1' fontSize={17}>{task.task}</Typography>
        {task.githubIssue ? <Button style={{ position: 'absolute', right: 70, bottom: 6.5 }} onClick={(evt) => {
          evt.stopPropagation()
          window.open(task.githubIssue.link)
        }}><AdjustIcon color='primary' sx={{ mr: 0.1 }} /><Typography variant='body1' color='#1976d2'>{task.githubIssue.name.split(':')[0]}</Typography></Button> : null}
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {task.githubIssue && task.githubIssue.name ? <Typography variant='subtitle2'>
            {task.githubIssue.name}
          </Typography> : null}
          {task.description ?
            <Typography variant='body1'>
              {task.description.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </Typography> : null}
          <Button variant="outlined" color='error' sx={{ alignSelf: 'end', mb: 1, mr: 3 }} onClick={async () => {
            await deleteTask(project.id, task['_id']);
            getTasks(project.id).then((projectTasks) => setTasks(projectTasks));
          }}>{<DeleteIcon />}</Button>
        </Box>
      </AccordionDetails>


    </Accordion>
  ))
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={1}>
        {htmlList}
      </Stack>
      <CreateTaskForm project={project} refreshTaskList={setTasks} />
    </Box>
  );
}