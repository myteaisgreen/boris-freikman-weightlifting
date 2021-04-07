import { Button, Grid, Hidden, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import Athletes from "../athletes/Athletes";
import EditProfile from "../EditProfile";
import EditUserFromParams from "../EditUserFromParams";
import AddExercise from "../exercises/AddExercise";
import Exercises from "../exercises/Exercises";
import Profile from "../Profile";
import RegisterProfile from '../RegisterProfile';
import AdminActiveWorkouts from "../workouts/AdminActiveWorkouts";
import AddWorkout from "../workouts/AddWorkout";
import AdminWorkout from "../workouts/AdminWorkout";
import AdminPreviousWorkouts from '../workouts/AdminPreviousWorkouts';

function AdminBoard() {
  const [content, setContent] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getAdminBoard().then(
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
      <Grid container component="main" direction="row">
        <Hidden smDown>
          <Grid item xs={false} sm={3} md={3} component={Paper}>
            <Button
              component={Link}
              to={"/admin/profile"}
              variant="outlined"
              fullWidth
            >
              <h3>Profile</h3>
            </Button>
            <Button
              component={Link}
              to={"/admin/athletes"}
              variant="outlined"
              color="primary"
              fullWidth
            >
              <h3>Athletes</h3>
            </Button>
            <Button
              component={Link}
              to={"/admin/exercises"}
              variant="outlined"
              color="primary"
              fullWidth
            >
              <h3>Exercises</h3>
            </Button>
            <Button
              component={Link}
              to={"/admin/newWorkout"}
              variant="outlined"
              color="primary"
              fullWidth
            >
              <h3>new workout</h3>
            </Button>
            <Button
              component={Link}
              to={"/admin/activeWorkouts"}
              variant="outlined"
              color="primary"
              fullWidth
            >
              <h3>Active Workouts</h3>
            </Button>
            <Button
              component={Link}
              to={"/admin/previousWorkouts"}
              variant="outlined"
              color="primary"
              fullWidth
            >
              <h3>Previous Workouts</h3>
            </Button>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={9} md={9} component={Paper}>
          <Switch>
            <Route exact path="/admin/profile">
              <Profile user={currentUser} />
            </Route>
            <Route exact path="/admin/profile/editProfile">
              <EditProfile user={currentUser} />
            </Route>
            <Route exact path="/admin/athletes" component={Athletes} />
            <Route exact path="/admin/athletes/editProfile/:id" component={EditUserFromParams}/>
            <Route exact path="/admin/athletes/register" component={RegisterProfile}/>
            <Route exact path="/admin/exercises" component={Exercises} />
            <Route exact path="/admin/workout/:id" component={AdminWorkout} />
            <Route
              exact
              path="/admin/exercises/addExercise"
              component={AddExercise}
            />
            <Route exact path="/admin/newWorkout" component={AddWorkout}/>
            <Route exact path="/admin/activeWorkouts" component={AdminActiveWorkouts}/>
            <Route exact path="/admin/previousWorkouts" component={AdminPreviousWorkouts}/>
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminBoard;
