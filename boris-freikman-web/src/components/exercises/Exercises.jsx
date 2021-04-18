import { Divider, Grid, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/admin.service";
import ExercisesListItem from "./ExercisesListItem";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await AdminService.getAllExercises();
        setExercises(response.data.exercises);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExercises();
  }, []);

  const deleteFromExercisesByName = (name) => {
    let index = exercises.findIndex((exercise) => exercise.name === name);
    exercises.splice(index, 1);
    setExercises([...exercises]);
  };

  const editDescriptionByName = (name, description) => {
    let exercise = exercises.find((exercise) => exercise.name === name);
    exercise.description = description;
    setExercises([...exercises]);
  };

  return (
    <div>
      <TextField
        fullWidth
        id="search"
        name="search"
        label="Search for exercise..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Divider />
      <ul style={{ "list-style-type": "none" }}>
        {!searchQuery &&
          exercises?.map((exercise, index) => (
            <li key={exercise.name}>
              <ExercisesListItem
                name={exercise.name}
                description={exercise.description}
                deleteFromExercisesByName={deleteFromExercisesByName}
                editDescriptionByName={editDescriptionByName}
              />
            </li>
          ))}
        {searchQuery &&
          exercises?.filter((exercise) => exercise.name.includes(searchQuery))
            .map((exercise, index) => (
              <div key={exercise.name}>
                <ExercisesListItem
                  name={exercise.name}
                  description={exercise.description}
                  deleteFromExercisesByName={deleteFromExercisesByName}
                  editDescriptionByName={editDescriptionByName}
                />
              </div>
            ))}
      </ul>

      <Button
        fullWidth={true}
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineOutlinedIcon />}
        component={Link}
        to={"/admin/exercises/addExercise"}
      >
        Add Exercise
      </Button>
    </div>
  );
}

export default Exercises;
