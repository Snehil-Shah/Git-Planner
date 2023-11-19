import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateTaskForm from './createTask';
import { editTask, getTasks } from '../../services/tasks';
import AdjustIcon from '@mui/icons-material/Adjust';
import { deleteTask } from '../../services/tasks';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material';
import EditTaskForm from './editTask';

export default function TaskList({ project }) {
  const [taskList, setTasks] = React.useState([]);

  React.useEffect(() => { getTasks(project.id).then((projectTasks) => setTasks(projectTasks)) }, [project]);
  // HACK: Make this a separate item component and organize them in some folder like utils or smth
  let htmlList = taskList.map((task, index) => (
    <Accordion key={index}
    sx={{ display: 'flex', flexDirection: 'column', px: 1 , textDecoration: task.completed? 'line-through': 'none', color: task.completed? 'text.secondary':'none', opacity: task.completed? 0.75 : 1}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <FormControlLabel control={<Checkbox checked={task.completed} onChange={async (evt)=>{
          // TODO: Add exception handling for all async operations and maybe manage an error state to show user error messages
          setTasks(prevList=>(prevList.map(t=> t._id == task._id ? {...t,completed: evt.target.checked} : t)));
          await editTask(task._id, {completed: evt.target.checked});
        }}/>}
        onClick={(e)=>{e.stopPropagation()}}
        label={
          <Typography variant='body1' fontSize={18}>{task.task}</Typography>
        } />
        {task.githubIssue ? <Button style={{ position: 'absolute', right: 70, bottom: 15 }} onClick={(evt) => {
          evt.stopPropagation()
          window.open(task.githubIssue.link)
        }}><AdjustIcon sx={{ mr: 0.1 , color: task.completed? 'text.secondary': 'primary'}} /><Typography color={task.completed? 'text.secondary': 'primary'} variant='body1'>{task.githubIssue.name.split(':')[0]}</Typography></Button> : null}
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
              setTasks(prevTasks=>prevTasks.filter((t)=>t._id != task._id))
              await deleteTask(project.id, task['_id']);
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