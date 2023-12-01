import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CreateTaskForm from './Tasks/createTask';
import { getTasks } from '../../services/tasks';
import useAlert from '../../hooks/Alert';
import Snackbar from '@mui/material/Snackbar'
import CheckIcon from '@mui/icons-material/Check'
import TaskField from './Tasks/TaskField';
import Alert from '../utils/Alert';

export default function TaskList({ project }) {
  const [taskList, setTasks] = useState([]);

  const [deleteAlert, setDeleteAlert, handleDeleteClose] = useAlert(false);
  const [successAlert, setSuccessAlert, handleSuccessClose] = useAlert(false);

  useEffect(() => {
    if (project) {
      getTasks(project.id).then((projectTasks) => setTasks(projectTasks))
    }
  }, [project]);

  let htmlList = taskList.map((task, index) => (
    <TaskField key={index} task={task} setSuccessAlert={setSuccessAlert} setDeleteAlert={setDeleteAlert} project={project} setTasks={setTasks} />
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