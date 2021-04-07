import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React from 'react';

// FIXME: For some reason, the time shown is of the time
// when the component has been mounted first

function AddWorkoutDateTimePicker({field, form: {values, setFieldValue}}) {
    const onChangeDate = (value) => {
      let date = new Date(Date.parse(value));
      setFieldValue("dateAndTime", date.toLocaleString());
    }
  
  return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h3>Pick the time and date: </h3>
          <DateTimePicker 
            {...field}
            ampm={false}
            disablePast={true} 
            value={values.dateAndTime} 
            onChange={onChangeDate} 
          />
        </MuiPickersUtilsProvider>
    )
}

export default AddWorkoutDateTimePicker
