import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import AdminService from "../../services/admin.service";

const validationSchema = yup.object({
  name: yup
    .string("Enter the name of the exercise")
    .required("Name is required"),
  description: yup.string("Enter your password"),
});

function AddExercise() {
  const [isSubmittingNewExercise, setIsSubmittingNewExercise] = useState(false); // TODO: Use for conditional rendering

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      submitNewExercise();
    },
  });

  const submitNewExercise = useCallback(async () => {
    setIsSubmittingNewExercise(true);
    const response = await AdminService.addExercise(
      formik.values.name,
      formik.values.description
    );
    formik.resetForm();
    alert(JSON.stringify(response, null, 2));
    setIsSubmittingNewExercise(false);
  }, [formik.values, isSubmittingNewExercise]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1>Add New Exercise</h1>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          type="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        {isSubmittingNewExercise ? (
          <CircularProgress />
        ) : (
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            startIcon={<SendIcon />}
          >
            Submit New Exercise
          </Button>
        )}
      </form>
    </div>
  );
}

export default AddExercise;
