import { Button, Divider, Typography } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
import React, {useState} from 'react';
import * as Yup from 'yup';
import AddWorkoutAddAthletes from './AddWorkoutAddAthletes';
import AddWorkoutAddExercises from './AddWorkoutAddExercises';
import AddWorkoutDateTimePicker from './AddWorkoutDateTimePicker';
import AdminService from '../../services/admin.service';
import AlertSnackbar from '../AlertSnackbar';

const initialValues = {
  dateAndTime: new Date(),
  athletes: [],
  exercises: []
}

const exercisesValidationSchema = Yup.array().of(Yup.object().shape({
  order: Yup.number().required(),
  exercise: Yup.string().required("Required!"),
  percentageOfExercise: Yup.string().required("Required!"),
  sets: Yup.array()
    .of(
      Yup.object().shape({
        order: Yup.number().integer().required(), // This field is assigned automatically on the creation of the object
        reps: Yup.string("Enter reps")
          .matches(/^([1-9]\+){0,3}[1-9]$/, "Invalid format")
          .required("Fill!"),
        // sets
        repeatSet: Yup.number("How many times to repeat the set")
          .positive("Should be positive")
          .max(25, "HAHA. NO.")
          .required("Fill!"),
        weight: Yup.number("Enter weight")
          .positive("Should be positive")
          .max(300, "HAHA. NO.")
          .required("Fill!"),
      })
    )
    .required("Must have sets") // these constraints are shown if and only if inner constraints are satisfied
    .min(1, "Minimum of 1 sets"),
  notes: Yup.string(),
})).required().min(1, "A workout has to contain at least one exercise!");

const addWorkoutValidationSchema = Yup.object().shape({
  dateAndTime: Yup.date().required(),
  athletes: Yup.array().of(
    Yup.object().shape(
    {
      athlete: Yup.string().required(),
      snatchRecord: Yup.number().required(),
      cleanJerkRecord: Yup.number().required(),
    }
    )).required().min(1, "A workout has to contain at least one athlete!"),
  exercises: exercisesValidationSchema,
});


function AddWorkout() {
  const [alertSnackbar, setAlertSnackbar] = useState({type: "", message: ""});

  const handleSubmit = async (values) => {
    try {
      const response = await AdminService.addWorkout(values);
      setAlertSnackbar({type: "success", message: response.data.message});
    } catch (error) {
      setAlertSnackbar({type: "error", message: error.response.data.message || error.toString()});
    }
  }
  return (
    <div>
        <Typography variant="h2">
          Create A New Workout
        </Typography>
        <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addWorkoutValidationSchema}>
        {(formik) => {
          // console.log("Formik props", formik); // TODO: Remove
          return (
          <Form>
            <Field name="dateAndTime" component={AddWorkoutDateTimePicker}/>
            <Divider/>
            <Field name="athletes" component={AddWorkoutAddAthletes}/>
            <Divider/>
            <FieldArray name="exercises" component={AddWorkoutAddExercises}/>
            <Button type="submit" variant="contained" color="primary" fullWidth
              disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}>
              Submit New Workout
            </Button>
          </Form>
          )}} 
        </Formik>
        
        <AlertSnackbar type={alertSnackbar.type} message={alertSnackbar.message}/>
    </div>
  );
}

export default AddWorkout
