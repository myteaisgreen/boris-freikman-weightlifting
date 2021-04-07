import { Button, Paper } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import AdminService from "../../services/admin.service";
import { ErrorMessage } from 'formik';
import PickExerciseAndSets from "./PickExerciseAndSets";

function AddWorkoutAddExercises({form, ...arrayHelpers}) {
  const [exercisesFromDB, setExercisesFromDB] = useState("");
  
  const fetchExercises = useCallback(async () => {
    const exercisesFromDB = await AdminService.getAllExercises();
    setExercisesFromDB(exercisesFromDB);
  }, []);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);


  return (
    <div>
      <h3>Pick the exercises:</h3>
          {form.values.exercises && 
            form.values.exercises.map((selectedExercise, index) => (selectedExercise.order = index)) &&
            form.values.exercises.map((selectedExercise, index) => (
              <div key={selectedExercise.order}>
                <Paper elevation={3}>
                  <PickExerciseAndSets
                    form={form}
                    indexInExercises={index}
                    exercisesToChooseFrom={exercisesFromDB}
                  />
                </Paper>
                <Button
                color="secondary"
                fullWidth
                variant="contained"
                onClick={() => {arrayHelpers.remove(index)}}
              >
                Remove Exercise
              </Button>
              </div>
            ))}

          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => {
              arrayHelpers.push({
                order: "",
                exercise: "",
                percentageOfExercise: "",
                sets: [],
                notes: "",
              });
            }}
          >
            Add New Exercise
          </Button>
          </div>
          )
}

export default AddWorkoutAddExercises;