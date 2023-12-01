import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTask } from '../../../services/tasks';

export default function DeleteTaskForm({setDeleteAlert, project, task, refreshTaskList}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" size='small' color='error' sx={{py: 0.75}} onClick={handleClickOpen}>{<DeleteIcon fontSize='small' />}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{pt: 2.5}}>
                    Delete Task?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`'${task.task}' will be permanently deleted`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{px: 2.5, pb: 2.5}}>
                    <Button onClick={handleClose} sx={{color: 'text.secondary'}}>Cancel</Button>
                    <Button onClick={async ()=>{
                        refreshTaskList(prevTasks=>prevTasks.filter((t)=>t._id != task._id))
                        handleClose()
                        await deleteTask(project.id, task['_id']);
                        setDeleteAlert(true)
                    }} variant='contained' color='error' disableElevation>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}