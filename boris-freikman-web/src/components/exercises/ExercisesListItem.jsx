import React, { useState } from "react";
import { Fab, Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DeleteExerciseFormDialog from "./DeleteExerciseFormDialog";
import EditExerciseFormDialog from "./EditExerciseFormDialog";

function ExercisesListItem({
  name,
  description,
  deleteFromExercisesByName,
  editDescriptionByName
}) {
  const [openDeleteExercise, setOpenDeleteExercise] = useState(false);
  const [openEditExercise, setOpenEditExercise] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <h3>{name}</h3>
        <h6>{description}</h6>
      </div>

      <div>
        <Fab
          onClick={(e) => setOpenEditExercise(!openEditExercise)}
          color="secondary"
          aria-label="edit"
        >
          <EditIcon />
        </Fab>
        <Fab
          onClick={(e) => setOpenDeleteExercise(!openDeleteExercise)}
          color="primary"
          aria-label="edit"
        >
          <DeleteIcon />
        </Fab>
      </div>

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
