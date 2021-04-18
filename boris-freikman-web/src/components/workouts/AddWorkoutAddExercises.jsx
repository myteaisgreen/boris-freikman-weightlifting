import { Button, Paper, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import AdminService from "../../services/admin.service";
import { ErrorMessage } from "formik";
import PickExerciseAndSets from "./PickExerciseAndSets";

function AddWorkoutAddExercises({ form, ...arrayHelpers }) {
  const [exercisesFromDB, setExercisesFromDB] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await AdminService.getAllExercises();
        setExercisesFromDB(response.data.exercises);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExercises();
  }, []);

  return (
    <div>
      <Typography variant="h4">Pick the exercises:</Typography>
      <div>
        {form.values.exercises?.map((selectedExercise, index) => (selectedExercise.order = index)) &&
          form.values.exercises?.map((selectedExercise, index) => (
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
                onClick={() => {
                  arrayHelpers.remove(index);
                }}
              >
                Remove Exercise
              </Button>
            </div>
          ))}
      </div>
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
  );
}

export default AddWorkoutAddExercises;
