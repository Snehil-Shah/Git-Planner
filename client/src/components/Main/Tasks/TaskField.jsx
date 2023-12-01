import AdjustIcon from '@mui/icons-material/Adjust';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import EditTaskForm from './editTask';
import Box from '@mui/material/Box';
import DeleteTaskForm from './deleteTask';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { editTask } from '../../../services/tasks';

export default function TaskField({setSuccessAlert, project, setDeleteAlert, setTasks,task}){
    return(
        <Accordion
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
    )
}