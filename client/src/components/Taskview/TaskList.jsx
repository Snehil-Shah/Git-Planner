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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import EditTaskForm from './editTask';
import DeleteTaskForm from './deleteTask';
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default function TaskList({ project }) {
  const [taskList, setTasks] = React.useState([]);

  // Deletion Alert
  const [deleteAlert, setDeleteAlert] = React.useState(false);

  const handleDeleteClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteAlert(false);
  };

  const [successAlert, setSuccessAlert] = React.useState(false);

  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessAlert(false);
  };


  React.useEffect(() => { if (project){
    getTasks(project.id).then((projectTasks) => setTasks(projectTasks)) }}, [project]);
  // HACK: Make this a separate item component and organize them in some folder like utils or smth, also make folder for functions, organize into smaller components
  let htmlList = taskList.map((task, index) => (
    <Accordion key={index}
    sx={{ display: 'flex', flexDirection: 'column', px: 1 , textDecoration: task.completed? 'line-through': 'none', color: task.completed? 'text.secondary':'none', opacity: task.completed? 0.7 : 1}}
    elevation={2} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <FormControlLabel control={<Checkbox color='primary' checked={task.completed || false} onChange={async (evt)=>{
          setTasks(prevList=>(prevList.map(t=> t._id == task._id ? {...t,completed: evt.target.checked} : t)));
          await editTask(task._id, {completed: evt.target.checked});
        }}/>}
        onClick={(e)=>{e.stopPropagation()}}
        label={
          <Typography variant='body1' fontSize={18}>{task.task}</Typography>
        } />
        {task.githubIssue ? <Button color={task.completed? 'secondary': 'success'} style={{ position: 'absolute', right: 70, bottom: 15 }} onClick={(evt) => {
          evt.stopPropagation()
          window.open(task.githubIssue.link)
        }}><AdjustIcon sx={{ mr: 0.1 , color: task.completed? null: '#1f883d', fontWeight:'bolder'}} />
        <Typography color={task.completed? null: '#1f883d'} sx={{fontWeight:'bold'}} variant='body1'>{task.githubIssue.name.split(':')[0]}</Typography></Button> : null}
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {task.githubIssue && task.githubIssue.name ? <Typography variant='subtitle2' sx={{ color: 'text.secondary', fontWeight:'bold' }}>
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
            <EditTaskForm setSuccessAlert={setSuccessAlert} project={project} task={task} refreshTaskList={setTasks} />
            <DeleteTaskForm setDeleteAlert={setDeleteAlert} project={project} task={task} refreshTaskList={setTasks} />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  ))
  return (
    <Box sx={{ width: '100%' }}>
      <Snackbar open={deleteAlert} autoHideDuration={4000} onClose={handleDeleteClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} sx={{ mb: 5 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} onClose={handleDeleteClose} severity="error" sx={{ width: '80vh' }}>
            Task Deleted Successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={successAlert} autoHideDuration={4000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} sx={{ mb: 5 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} onClose={handleDeleteClose} severity="success" sx={{ width: '80vh' }}>
            Task Updated Successfully!
          </Alert>
        </Snackbar>
      <Stack spacing={1.4}>
        {htmlList}
      </Stack>
      <CreateTaskForm project={project} refreshTaskList={setTasks} />
    </Box>
  );
}