import { MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectMenu({menuOptions}) {
  const classes = useStyles();
  const [state, setState] = useState("");

  const handleChange = (event) => {
    setState(event.target.value);
  };
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="label">Menu</InputLabel>
        <Select
          value={state.age}
          onChange={handleChange}
          label="Menu"
        >
          {menuOptions?.map((option, i) => (
            <MenuItem 
              id={option.link}
              value={option.label}
              component={Link}
              to={option.link}
            >
                {option.label}
            </MenuItem>
          ))}
          
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectMenu;
