import { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { getTasks, editTask, getIssuesList } from '../../services/tasks';
import EditIcon from '@mui/icons-material/Edit';

export default function EditTaskForm({ project,task, refreshTaskList }) {

    const [formOpen, setForm] = useState(false);
    const [formContent, setFormContent] = useState({ taskName: task.task, taskDescription: task.description, linkedIssue: task.githubIssue });
    const [issues, setIssueList] = useState([])
    const handleFormOpen = () => {
        setForm(true);
    };
    const handleFormClose = () => {
        setForm(false);
    };

    useEffect(() => {
        getIssuesList(project.projectName).then((list) => {
            if (list) {
                const issueList =  list.map((issue) => ({name: `#${issue.id}: ${issue.name}`, link: issue.link}))
                setIssueList(issueList);
            }
        })
    }, [formOpen, project.projectName])

    return (
        <>
            <Button variant="outlined" size='small' color='secondary' sx={{mr: 1}} onClick={async () => {
              handleFormOpen()
            }}>{<EditIcon fontSize='small' />}</Button>
            <Dialog open={formOpen} onClose={handleFormClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
                <DialogContent sx={{ px: 4 }}>
                    <TextField
                        autoFocus
                        margin='dense'
                        id="name"
                        label="Task"
                        type="text"
                        fullWidth
                        variant='standard'
                        defaultValue={task.task}
                        onChange={(evt) => { setFormContent(prevContent => ({ ...prevContent, taskName: evt.target.value })) }}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        minRows={2}
                        maxRows={4}
                        fullWidth
                        sx={{ mt: 3 }}
                        variant='outlined'
                        margin='normal'
                        defaultValue={task.description}
                        onChange={(evt) => { setFormContent(prevContent => ({ ...prevContent, taskDescription: evt.target.value })) }}
                    />
                    {(issues.length !== 0 && project.provider == 'github') ? <Autocomplete
                        id="issue-selector"
                        options={issues}
                        fullWidth
                        defaultValue={task.githubIssue}
                        isOptionEqualToValue={(option, value) => option.name === value.name && option.link === value.link}
                        sx={{ my: 2 }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Link an Issue" />}
                        onChange={(evt, value) => {setFormContent(prevContent => ({ ...prevContent, linkedIssue: {name: value.name, link: value.link} })) }}
                    /> : null}
                </DialogContent>
                <DialogActions sx={{mb: 2, mr:3, mt:0, pt:0}}>
                    <Button onClick={handleFormClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={async () => {
                        await editTask(task['_id'], formContent);
                        getTasks(project.id).then((projectDetails) => refreshTaskList(projectDetails));
                        setForm(false);
                    }
                    } color="primary" variant='contained'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>)
}