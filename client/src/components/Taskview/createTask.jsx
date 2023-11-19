import { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTask, getIssuesList } from '../../services/tasks';

export default function CreateTaskForm({ project, refreshTaskList }) {

    const [formOpen, setForm] = useState(false);
    const [formContent, setFormContent] = useState();
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
            <Fab color="primary" aria-label="add" style={{ position: "fixed", right: "20px", bottom: "20px" }} onClick={handleFormOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={formOpen} onClose={handleFormClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Add Todo</DialogTitle>
                <DialogContent sx={{ px: 4 }}>
                    <TextField
                        autoFocus
                        margin='dense'
                        id="name"
                        label="Task"
                        type="text"
                        fullWidth
                        variant='standard'
                        onChange={(evt) => { setFormContent(prevContent => ({ ...prevContent, task: evt.target.value })) }}
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
                        onChange={(evt) => { setFormContent(prevContent => ({ ...prevContent, description: evt.target.value })) }}
                    />
                    {(issues.length !== 0 && project.provider == 'github') ? <Autocomplete
                        id="issue-selector"
                        options={issues}
                        fullWidth
                        defaultValue={null}
                        sx={{ my: 2 }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Link an Issue" />}
                        onChange={(evt, value) => {setFormContent(prevContent => ({ ...prevContent, githubIssue: {name: value.name, link: value.link} })) }}
                    /> : null}
                </DialogContent>
                <DialogActions sx={{mb: 2, mr:3, mt:0, pt:0}}>
                    <Button onClick={handleFormClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={async () => {
                        refreshTaskList(prevList=> [...prevList, formContent])
                        setForm(false);
                        await createTask(project.id, formContent.task, formContent.description, formContent.githubIssue);
                    }
                    } color="primary" variant='contained'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>)
}