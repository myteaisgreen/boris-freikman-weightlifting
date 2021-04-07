import { CircularProgress, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import AdminService from "../services/admin.service";

const validationSchema = yup.object({
  username: yup.string("Enter username").required("Required"),
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

function EditProfile({user}) {
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false); // TODO: Use for conditional rendering
  
  const formik = useFormik({
    initialValues: {
      username: user.username || "",
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      weight: user.weight || "",
      snatchRecord: user.snatchRecord || "",
      cleanJerkRecord: user.cleanJerkRecord || "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      updateProfile();
    },
  });

  const updateProfile = useCallback(async () => {
    setIsUpdatingProfile(true);
    // alert(JSON.stringify({_id: user._id, ...formik.values}, null, 2)); // TODO: REMOVE
    const response = await AdminService.updateUserById({...formik.values, _id: user._id});
    formik.resetForm(); // TODO: Leave? Remove?
    alert(JSON.stringify(response, null, 2));
    setIsUpdatingProfile(false);
  }, [formik.values, isUpdatingProfile, user]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1>Edit Profile</h1>
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
        {isUpdatingProfile ? (
          <CircularProgress />
        ) : (
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            startIcon={<SendIcon />}
          >
            Update Profile
          </Button>
        )}
      </form>
    </div>
  );
}

export default EditProfile;
