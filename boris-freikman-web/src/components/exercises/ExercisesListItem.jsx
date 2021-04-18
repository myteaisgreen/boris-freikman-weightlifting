import React, { useState } from "react";
import { Fab, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DeleteExerciseFormDialog from "./DeleteExerciseFormDialog";
import EditExerciseFormDialog from "./EditExerciseFormDialog";

const useStyles = makeStyles((theme) => ({
  root: { 
    marginBottom: "20px"
  },
  icons: {
    alignSelf: "center",
  },
}));

function ExercisesListItem({
  name,
  description,
  deleteFromExercisesByName,
  editDescriptionByName,
}) {
  const classes = useStyles();
  const [openDeleteExercise, setOpenDeleteExercise] = useState(false);
  const [openEditExercise, setOpenEditExercise] = useState(false);

  return (
    <div>
      <Paper variant="outlined" color="primary" elevation={3} className={classes.root}>
        <Grid container direction="row" >
          <Grid item xs={10} md={11}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="h6">{description}</Typography>
          </Grid>
          <Grid item className={classes.icons}>
            <Fab
              onClick={(e) => setOpenEditExercise(!openEditExercise)}
              color="secondary"
              aria-label="edit"
              size="small"
            >
              <EditIcon />
            </Fab>
            <Fab
              onClick={(e) => setOpenDeleteExercise(!openDeleteExercise)}
              color="primary"
              aria-label="edit"
              size="small"
            >
              <DeleteIcon />
            </Fab>
          </Grid>
        </Grid>
      </Paper>

      <DeleteExerciseFormDialog
        name={name}
        openDialog={openDeleteExercise}
        deleteFromExercisesByName={deleteFromExercisesByName}
      />
      <EditExerciseFormDialog
        name={name}
        description={description}
        openDialog={openEditExercise}
        editDescriptionByName={editDescriptionByName}
      />
    </div>
  );
}

export default ExercisesListItem;
