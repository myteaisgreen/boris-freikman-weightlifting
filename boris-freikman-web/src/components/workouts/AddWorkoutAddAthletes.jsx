import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorMessage } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import AdminService from '../../services/admin.service';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function AddWorkoutAddAthletes({form: {setFieldValue, setFieldTouched}}) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]); // For athletes NOT to be signed to the workout
  const [right, setRight] = useState([]);
  
  const fetchAthletes = useCallback(async () => {
    const usersForAdminBoard = await AdminService.getAllUsersForAdminBoard();
    setLeft(usersForAdminBoard);
  }, []);

  useEffect(() => {
    fetchAthletes();
  }, [fetchAthletes]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const createAthletesArray = (athletes) => {
    return athletes.map((athlete, index) => 
    athlete = {
      athlete: athlete._id,
      snatchRecord: athlete.snatchRecord, 
      cleanJerkRecord: athlete.cleanJerkRecord,
    }
    );
  }; 

  useEffect(() => {
    setFieldValue("athletes", createAthletesArray(right));
  }, [right])

  useEffect(() => {
    setFieldTouched("athletes", true);
  }, [])

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (athletes) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {athletes.map((athlete) => {
          const labelId = `transfer-list-item-${athlete}-label`;

          return (
            <ListItem key={athlete._id} role="listitem" button onClick={handleToggle(athlete)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(athlete) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${athlete.firstName} ${athlete.lastName}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <div>
        <h3>Pick the athletes:</h3>
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
          <Grid item>{customList(left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList(right)}</Grid>
        </Grid>
        <ErrorMessage name="athletes"/>
    </div>
  );
}