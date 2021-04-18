import { Fab, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  editIcon: {
    alignSelf: "center"
  }
}));

function AthletesListItem(props) {
  const classes = useStyles();
  const name = props.firstName + " " + props.lastName;
  const pathForEditing = `/admin/athletes/editProfile/${props.id}`;

  return (
    <div>
      <li key={props.uniqueKey}>
        <Paper variant="outlined" color="primary" elevation={3}>
          <Grid container direction="row">
            <Grid item xs={10} md={11}>
              <Typography variant="h3">{name}</Typography>
              <Typography variant="h6">
                Personal Bests: Snatch: {props.snatchRecord}, C&J: {props.cleanJerkRecord}
              </Typography>
              <Typography variant="h6">
                {props.weight} KG body weight
              </Typography>
            </Grid>
            <Grid item className={classes.editIcon}>
              <Fab size="small" color="secondary" aria-label="edit">
                <Link to={pathForEditing}>
                  <EditIcon />
                </Link>
              </Fab>
            </Grid>
          </Grid>
        </Paper>
      </li>
    </div>
  );
}

export default AthletesListItem;
