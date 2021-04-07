import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import AdminService from '../../services/admin.service';
import { useHistory } from 'react-router-dom';

export default function EditExerciseFormDialog({name, description, openDialog, editDescriptionByName}) {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [typedValue, setTypedValue] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(()=>{
        setOpen(openDialog);
    }, [openDialog])

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditExercise = (name) => {
        let updatedDescription = typedValue;
        let response = AdminService.updateExercise(name, updatedDescription);
        editDescriptionByName(name, updatedDescription);
        setOpen(false);
    }

    return (
        <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Exercise</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Enter a new, clearer description of the exercise:
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="description"
                defaultValue={description}
                fullWidth
                onChange={e => setTypedValue(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button 
                onClick={e => {handleEditExercise(name)}} 
                color="primary"
                to={"/admin/exercises"}>
                Submit
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}