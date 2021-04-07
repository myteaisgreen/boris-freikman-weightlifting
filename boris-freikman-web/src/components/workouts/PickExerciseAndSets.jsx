import TextField from '@material-ui/core/TextField';
import { FieldArray } from 'formik';
import React from "react";
import AddSets from './AddSets';
import ExerciseSelector from "./ExerciseSelector";
import PercentageOfExerciseSelector from "./PercentageOfExerciseSelector";

function PickExerciseAndSets({form, indexInExercises, exercisesToChooseFrom}) {
  return (
    <div>
      <h5>Sets List</h5>
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ExerciseSelector
            name={`exercises[${indexInExercises}].exercise`}
            value={form.values.exercises[indexInExercises].exercise}
            onChange={form.handleChange}
            listOfExercises={exercisesToChooseFrom}
          />
          <PercentageOfExerciseSelector
            name={`exercises[${indexInExercises}].percentageOfExercise`}
            value={form.values.exercises[indexInExercises].percentageOfExercise}
            onChange={form.handleChange}
          />
          <FieldArray 
            name={`exercises[${indexInExercises}].sets`} 
            component={AddSets}
          />
          <TextField
            fullWidth
            name={`exercises[${indexInExercises}].notes`}
            label="Exercise Notes"
            value={form.values.exercises[indexInExercises].notes}
            onChange={form.handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PickExerciseAndSets;
