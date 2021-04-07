import { Paper, Fab } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from "react-router-dom";

function WorkoutsListItem({ dateAndTime, id }) {
  const [when, setWhen] = useState();
  useEffect(() => {
    let date = new Date(Date.parse(dateAndTime));
    let dateOptions = {
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    setWhen(date.toLocaleString("en-IL", dateOptions));
  });
  return (
    <div>
      <Paper>
        <h3>{when}</h3>
        {/* <h5>{id}</h5> */}

        <Fab color="secondary" aria-label="edit">
          <Link to={`/admin/workout/${id}`}>
            <VisibilityIcon />
          </Link>
        </Fab>
      </Paper>
    </div>
  );
}

export default WorkoutsListItem;
