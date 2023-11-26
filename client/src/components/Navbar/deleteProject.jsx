import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Delete from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Menu, MenuItem, Typography } from '@mui/material';
import { deleteProject } from '../../services/projects';


export default function DeleteMenu({setProject,project, projectToDelete, menuPosition, setMenuPosition, refreshProjectList}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Menu
                keepMounted
                open={menuPosition !== null}
                onClose={() => setMenuPosition(null)}
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
            >
                <MenuItem onClick={()=>{handleClickOpen(); setMenuPosition(null);}}><Delete color='error' fontSize='small' sx={{mr: 0.4, ml:0}}/><Typography variant="button" color='error' sx={{mr:0.5}}>Project</Typography></MenuItem>
            </Menu>
            {projectToDelete? <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{pt: 2.5}}>
                    Delete Project?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`'${projectToDelete.projectName}' and all its tasks will be permanently deleted`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{px: 2.5, pb: 2.5}}>
                    <Button onClick={handleClose} sx={{color: 'text.secondary'}}>Cancel</Button>
                    <Button onClick={async ()=>{
                        refreshProjectList(prevProjects=>prevProjects.filter((p)=> p.id != projectToDelete.id))
                        if(project && projectToDelete.projectName == project.projectName) setProject(null);
                        handleClose()
                        await deleteProject(projectToDelete.id);
                    }} variant='contained' color='error' disableElevation>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog> : null}
        </>
    );
}