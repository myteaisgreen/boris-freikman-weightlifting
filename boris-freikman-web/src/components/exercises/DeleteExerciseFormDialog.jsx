import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import AdminService from '../../services/admin.service';

export default function DeleteExerciseFormDialog({name, openDialog, deleteFromExercisesByName}) {
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

    const handleDeleteExercise = (name) => {
        let response = AdminService.deleteExercise(name);
        deleteFromExercisesByName(name);
        setOpen(false);
    }

    const shouldBeDisabled = () => {
        return typedValue.localeCompare(name) ? true : false;
    }

    return (
        <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Delete Exercise</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you <b>sure</b> you want to delete this exercise?
                Type <b>{name}</b> below:
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Exercise name"
                fullWidth
                onChange={e => setTypedValue(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button disabled={shouldBeDisabled()}  
                onClick={e => {handleDeleteExercise(name)}} 
                color="primary"
                to={"/admin/exercises"}>
                Delete Exercise
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}