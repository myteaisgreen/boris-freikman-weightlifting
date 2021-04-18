import { CircularProgress, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import AdminService from "../services/admin.service";
import AlertSnackbar from "./AlertSnackbar";

const validationSchema = yup.object({
  username: yup.string("Enter username").required("Required"),
  password: yup
    .string("Enter password")
    .min(8, "Password is too short - 8 characters atleast")
    .matches(/[a-zA-z0-9]/, "Password should only contain latin letters or numbers")
    .required("Required"),
  email: yup
    .string("Enter email")
    .email("Must be a valid email address")
    .required("Required!"),
  firstName: yup
    .string("Enter First Name")
    .matches(/^[A-Za-z]+$/, "First name should only contain english letters")
    .required("Required"),
  lastName: yup
    .string("Enter Last Name")
    .matches(/^[A-Za-z]+$/, "Last name should only contain english letters")
    .required("Required"),
  weight: yup
    .number("Enter current body weight")
    .positive("Weight can only be positive, duh")
    .integer("Weight should be an integer")
    .lessThan(200, "I think we are exaggerating..."),
  snatchRecord: yup
    .number("Enter current Snatch record")
    .positive()
    .integer("Snatch record should be an integer")
    .lessThan(200, "I think we are exaggerating..."),
  cleanJerkRecord: yup
    .number("Enter current Clean&Jerk record")
    .positive()
    .integer("Clean&Jerk record should be an integer")
    .lessThan(250, "I think we are exaggerating..."),
});

function RegisterProfile() {
  const [isRegisteringProfile, setIsRegisteringProfile] = useState(false); // TODO: Use for conditional rendering
  const [alertSnackbar, setAlertSnackbar] = useState({type: "", message: ""});
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      weight: "",
      snatchRecord: "",
      cleanJerkRecord: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      registerProfile();
    },
  });

  const registerProfile = useCallback(async () => {
    setIsRegisteringProfile(true);
    try {
      const response = await AdminService.registerNewUser({...formik.values});
      formik.resetForm(); 
      setAlertSnackbar({type: "success", message: response.data.message});
    } catch(error) {
      setAlertSnackbar({type: "error", message: error.response.data.message || error.toString()});
    }
    setIsRegisteringProfile(false);
  }, [formik, isRegisteringProfile]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1>Register Profile</h1>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <Divider/>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Divider/>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Divider/>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={
            formik.touched.firstName && Boolean(formik.errors.firstName)
          }
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <Divider/>
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={
            formik.touched.lastName && Boolean(formik.errors.lastName)
          }
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <Divider/>
        <TextField
          fullWidth
          id="weight"
          name="weight"
          label="Weight"
          value={formik.values.weight}
          onChange={formik.handleChange}
          error={
            formik.touched.weight && Boolean(formik.errors.weight)
          }
          helperText={formik.touched.weight && formik.errors.weight}
        />
        <Divider/>
        <TextField
          fullWidth
          id="snatchRecord"
          name="snatchRecord"
          label="Snatch Record"
          value={formik.values.snatchRecord}
          onChange={formik.handleChange}
          error={
            formik.touched.snatchRecord && Boolean(formik.errors.snatchRecord)
          }
          helperText={formik.touched.snatchRecord && formik.errors.snatchRecord}
        />
        <Divider/>
        <TextField
          fullWidth
          id="cleanJerkRecord"
          name="cleanJerkRecord"
          label="Clean&Jerk Record"
          value={formik.values.cleanJerkRecord}
          onChange={formik.handleChange}
          error={
            formik.touched.cleanJerkRecord && Boolean(formik.errors.cleanJerkRecord)
          }
          helperText={formik.touched.cleanJerkRecord && formik.errors.cleanJerkRecord}
        />
        <Divider/>
        {isRegisteringProfile ? (
          <CircularProgress />
        ) : (
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            startIcon={<SendIcon />}
          >
            Register Profile
          </Button>
        )}
        <AlertSnackbar type={alertSnackbar.type} message={alertSnackbar.message}/>
      </form>
    </div>
  );
}

export default RegisterProfile;
