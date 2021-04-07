import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import UserCurrentWorkout from "../workouts/UserCurrentWorkout";
import EditProfile from "../EditProfile";
import Profile from "../Profile";
import UserPreviousWorkouts from "../workouts/UserPreviousWorkouts";

function UserBoard() {
  const [content, setContent] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        console.log("ERROR" + error.toString());
        setContent({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  });

  return (
    <div>
      <h1>{content}</h1>
      <Grid container component="main" direction="row" spacing={2}>
        <Hidden smDown>
          <Grid item xs={false} sm={3} md={3} component={Paper}>
            <Button component={Link} to={'/user/profile'} variant="outlined" fullWidth>
              <h3>Profile</h3>
            </Button>
            <Button component={Link} to={'/user/currentWorkout'} variant="outlined" color="primary" fullWidth>
              <h3>Current Workout</h3>
            </Button>
            <Button component={Link} to={'/user/previousWorkouts'} variant="outlined" color="primary" fullWidth>
              <h3>Previous Workouts</h3>
            </Button>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={9} md={9} component={Paper}>
          <Switch>
            <Route exact path="/user/profile">
              <Profile user={currentUser}/>
            </Route>
            <Route exact path="/user/profile/editProfile">
              <EditProfile user={currentUser}/>
            </Route>
            <Route exact path="/user/currentWorkout" component={UserCurrentWorkout}/>
            <Route exact path="/user/previousWorkouts" component={UserPreviousWorkouts}/>
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserBoard;
