import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';
import { submitCreateProjectForm } from '../../services/projects';
import { getProjects } from '../../services/projects';

export default function CreateTaskForm({refreshProjectList}) {
    const [formOpen, setForm] = useState(false);
    const [projectName, setProjectName] = useState('');
    const handleFormOpen = () => {
        setForm(true);
    };

    const handleFormClose = () => {
        setForm(false);
    };

    return (
        <>
            <Button variant="contained" disableElevation style={{
                position: "relative", margin: "5%"
            }} onClick={handleFormOpen}>
                <AddIcon />Project
            </Button>
            <Dialog open={formOpen} onClose={handleFormClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Project"
                        type="text"
                        fullWidth
                        onChange={(evt) => { setProjectName(evt.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFormClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={async () => {
                        await submitCreateProjectForm(projectName);
                        getProjects().then((projects) => refreshProjectList(projects));
                        setForm(false);
                    }
                    } color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}