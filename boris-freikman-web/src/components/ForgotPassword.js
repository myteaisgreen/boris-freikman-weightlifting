import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";



const initialValues = { email: "" };
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required')
});

function ForgotPassword() {

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const sendRecoveryEmail = () => {
    // TODO: COMPLETE(email) 
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
        <Button color="primary" variant="contained" onSubmit={sendRecoveryEmail} fullWidth type="submit" startIcon={<MailOutlineOutlinedIcon/>}>
          Send recovery e-mail
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
