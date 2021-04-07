import { Fab, Paper } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from "react";
import { Link } from "react-router-dom";

function AthletesListItem(props) {
  const name = props.firstName + " " + props.lastName;
  const pathForEditing = `/admin/athletes/editProfile/${props.id}`

  return (
    <div>
      <li key={props.uniqueKey}>
        <Paper variant="outlined" color="primary" elevation={3}>
          <h2>{name}</h2>
          <h4>
            Snatch: {props.snatchRecord}, CJ: {props.cleanJerkRecord} @{" "}
            {props.weight}KG
          </h4>
          <Fab color="secondary" aria-label="edit">
            <Link to={pathForEditing}>
              <EditIcon />
            </Link>
          </Fab>
          {/* <Fab color="primary" aria-label="edit">
            <DeleteIcon/>
          </Fab> */}
        </Paper>
      </li>
    </div>
  );
}

export default AthletesListItem;
