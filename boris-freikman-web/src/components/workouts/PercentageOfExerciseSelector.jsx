import { FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function PercentageOfExerciseSelector({name, onChange}) {
  const classes = useStyles();
  const [percentageOfExerciseSelector, setPercentageOfExerciseSelector] = useState("");

  const handleChange = (event) => {
    setPercentageOfExerciseSelector(event.target.value);
    onChange(event);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel shrink id="select-exercise-label">
          Percentage Of Exercise
        </InputLabel>
        <Select
          labelId="select-exercise"
          name={name}
          value={percentageOfExerciseSelector}
          onChange={handleChange}
          displayEmpty
          autoWidth
          className={classes.selectEmpty}
        >
          <MenuItem key={"PickWeight"} value={"Weight"}>
            {"Weight"}
          </MenuItem>
          <MenuItem key={"PickSnatch"} value={"Snatch"}>
            {"Snatch"}
          </MenuItem>
          <MenuItem key={"PickClean&Jerk"} value={"Clean&Jerk"}>
            {"Clean&Jerk"}
          </MenuItem>
        </Select>
        <FormHelperText>
          Weight is % of Snatch/C&J/None
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default PercentageOfExerciseSelector;
