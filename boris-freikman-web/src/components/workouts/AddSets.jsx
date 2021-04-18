import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { getIn } from "formik";
import React from "react";

const useStyles = makeStyles((theme) => ({
  icons: {
    alignSelf: "center",
  },
}));

// Function to extract the Index in exercises array from the name of the FieldArray component.
// Made this way since it's "difficult" to pass props to a component rendered by FieldArray "component" prop
const getIndexInExercisesFromName = (name) => {
    return name.match(/\d/g).join("");
}

function AddSets({form, ...arrayHelpers }) {
    const classes = useStyles();
    const indexInExercises = arrayHelpers && arrayHelpers.name ? getIndexInExercisesFromName(arrayHelpers.name) : null;

  return (
      <Grid container>
          {form.values.exercises[indexInExercises]?.sets?.map((set, index) => (set.order = index)) &&
            form.values.exercises[indexInExercises]?.sets?.map((set, index) => (
              <Grid 
                key={`${indexInExercises}.${index}`}
                item
                container
                direction="row"
                spacing={2}
              >
                <Grid item container direction="column">
                  <TextField
                    id={`${indexInExercises}.sets[${index}].weight`}
                    name={`exercises[${indexInExercises}].sets[${index}].weight`}
                    label="Weight"
                    value={set.weight}
                    onChange={form.handleChange}
                    style={{ width: 50 }}
                    error={
                      getIn(form.touched, `exercises[${indexInExercises}].sets[${index}].weight`) &&
                      Boolean(getIn(form.errors, `exercises[${indexInExercises}].sets[${index}].weight`))
                    }
                    helperText={
                      getIn(form.touched, `exercises[${indexInExercises}].sets[${index}].weight`) &&
                      getIn(form.errors, `exercises[${indexInExercises}].sets[${index}].weight`)
                    }
                  />
                  <TextField
                    id={`${indexInExercises}.sets[${index}].reps`}
                    name={`exercises[${indexInExercises}].sets[${index}].reps`}
                    label="Reps"
                    value={set.reps}
                    onChange={form.handleChange}
                    style={{ width: 50 }}
                    error={
                      getIn(form.touched, `exercises[${indexInExercises}].sets[${index}].reps`) &&
                      Boolean(getIn(form.errors, `exercises[${indexInExercises}].sets[${index}].reps`))
                    }
                    helperText={
                      getIn(form.touched, `exercises[${indexInExercises}].sets[${index}].reps`) &&
                      getIn(form.errors, `exercises[${indexInExercises}].sets[${index}].reps`)
                    }
                  />
                </Grid>
  
                <Grid item>
                  <TextField
                    id={`${indexInExercises}.sets[${index}].repeatSet`}
                    name={`exercises[${indexInExercises}].sets[${index}].repeatSet`}
                    label="Sets"
                    value={set.repeatSet}
                    onChange={form.handleChange}
                    style={{ width: 50 }}
                    error={
                      getIn(form.touched, `exercises[${indexInExercises}].sets[${index}].repeatSet`) &&
                      Boolean(getIn(form.errors, `exercises[${indexInExercises}].sets[${index}].repeatSet`))
                    }
                    helperText={
                      getIn(form.touched, `exercises[${indexInExercises}].sets[${index}].repeatSet`) &&
                      getIn(form.errors, `exercises[${indexInExercises}].sets[${index}].repeatSet`)
                    }
                  />
    
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    -
                  </Button>
                </Grid>
              </Grid>
            ))}
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() =>
            arrayHelpers.push({
              order: "",
              reps: "",
              repeatSet: "",
              weight: "",
            })
          }
        >
          +
        </Button>
      </Grid>
  );
}

export default AddSets;
