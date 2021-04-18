import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { Typography } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";

// FIXME: For some reason, the time shown is of the time
// when the component has been mounted first

function AddWorkoutDateTimePicker({ field, form: { values, setFieldValue } }) {
  const onChangeDate = (value) => {
    let date = new Date(Date.parse(value));
    setFieldValue("dateAndTime", date.toLocaleString());
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Typography variant="h4">
        Pick the time and date:
      </Typography>
      <DateTimePicker
        {...field}
        ampm={false}
        disablePast={true}
        value={values.dateAndTime}
        onChange={onChangeDate}
      />
    </MuiPickersUtilsProvider>
  );
}

export default AddWorkoutDateTimePicker;
