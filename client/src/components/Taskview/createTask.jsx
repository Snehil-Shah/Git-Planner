import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { getTasks } from '../../services/tasks';

import { submitTodoForm } from '../../services/tasks';

export default function CreateTaskForm({projectId, refreshTaskList}) {

    const [formOpen, setForm] = useState(false);
    const [taskName, setTaskName] = useState('');
    const handleFormOpen = () => {
        setForm(true);
    };

    const handleFormClose = () => {
        setForm(false);
    };

    return (
        <>
            <Fab color="primary" aria-label="add" style={{ position: "fixed", right: "20px", bottom: "20px" }} onClick={handleFormOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={formOpen} onClose={handleFormClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Task"
                        type="text"
                        fullWidth
                        onChange={(evt)=> { setTaskName(evt.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFormClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={async () => {
                        await submitTodoForm(projectId, taskName);
                        getTasks(projectId).then((projectDetails) => refreshTaskList(projectDetails));
                        setForm(false);
                    }
                    } color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>)
}