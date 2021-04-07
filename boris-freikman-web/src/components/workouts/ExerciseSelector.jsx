import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ExerciseSelector({name, onChange, listOfExercises}) {
  const exercises = listOfExercises;
  const classes = useStyles();
  const [exercise, setExercise] = useState("");

  const handleChange = (event) => {
    setExercise(event.target.value);
    onChange(event);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel shrink id="select-exercise-label">
          Exercise
        </InputLabel>
        <Select
          labelId="select-exercise"
          id="exercise"
          name={name}
          value={exercise}
          onChange={handleChange}
          displayEmpty
          autoWidth
          className={classes.selectEmpty}
        >
          {exercises &&
          exercises.map((exercise, index) => (
            <MenuItem key={exercise._id} value={exercise._id}>{exercise.name}</MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>Pick Exercise</FormHelperText> */}
      </FormControl>
    </div>
  );
}

export default ExerciseSelector;
