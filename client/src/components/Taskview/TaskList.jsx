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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material';
import EditTaskForm from './editTask';

export default function TaskList({ project }) {
  const [taskList, setTasks] = React.useState([]);

  React.useEffect(() => { getTasks(project.id).then((projectTasks) => setTasks(projectTasks)) }, [project.id]);
  // HACK: Make this a separate item component and organize them in some folder like utils or smth
  let htmlList = taskList.map((task) => (
    <Accordion key={task['_id']} sx={{ display: 'flex', flexDirection: 'column', px: 1 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {/* <FormControlLabel control={<Checkbox />} label={
          typography content
          // TODO
         } /> */}
        <Typography variant='body1' fontSize={18}>{task.task}</Typography>
        {task.githubIssue ? <Button style={{ position: 'absolute', right: 70, bottom: 15 }} onClick={(evt) => {
          evt.stopPropagation()
          window.open(task.githubIssue.link)
        }}><AdjustIcon color='primary' sx={{ mr: 0.1 }} /><Typography variant='body1' sx={{ color: 'primary' }}>{task.githubIssue.name.split(':')[0]}</Typography></Button> : null}
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {task.githubIssue && task.githubIssue.name ? <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
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
          <Box sx={{ alignSelf: 'end', mr: 3 }}>
            <EditTaskForm project={project} task={task} refreshTaskList={setTasks} />
            <Button variant="outlined" size='small' color='error' onClick={async () => {
              await deleteTask(project.id, task['_id']);
              getTasks(project.id).then((projectTasks) => setTasks(projectTasks));
            }}>{<DeleteIcon fontSize='small' />}</Button>
          </Box>
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