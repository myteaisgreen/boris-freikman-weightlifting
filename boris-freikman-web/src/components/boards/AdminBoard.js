import { Button, Grid, Hidden, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Athletes from "../athletes/Athletes";
import EditProfile from "../EditProfile";
import EditUserFromParams from "../EditUserFromParams";
import AddExercise from "../exercises/AddExercise";
import Exercises from "../exercises/Exercises";
import Profile from "../Profile";
import RegisterProfile from "../RegisterProfile";
import AddWorkout from "../workouts/AddWorkout";
import AdminActiveWorkouts from "../workouts/AdminActiveWorkouts";
import AdminPreviousWorkouts from "../workouts/AdminPreviousWorkouts";
import AdminWorkout from "../workouts/AdminWorkout";
import RegularMenu from "./RegularMenu";
import SelectMenu from './SelectMenu';

function AdminBoard() {
  const currentUser = AuthService.getCurrentUser();
  const menuOptions = [
    {
      label: "Profile",
      link: "/admin/profile",
    },
    {
      label: "Athletes",
      link: "/admin/athletes",
    },
    {
      label: "Exercises",
      link: "/admin/exercises",
    },
    {
      label: "New Workout",
      link: "/admin/newWorkout",
    },
    {
      label: "Active Workouts",
      link: "/admin/activeWorkouts",
    },
    {
      label: "Previous Workouts",
      link: "/admin/previousWorkouts",
    },
  ];

  return (
    <div>
      <Grid container component="main" direction="row">
        <Hidden mdUp>
          <Grid item xs={12}>
            <SelectMenu menuOptions={menuOptions}/>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item xs={0} sm={0} md={3} component={Paper}>
            <RegularMenu menuOptions={menuOptions}/>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md={9} component={Paper}>
          <Switch>
            <Route exact path="/admin/profile">
              <Profile user={currentUser} />
            </Route>
            <Route exact path="/admin/profile/editProfile">
              <EditProfile user={currentUser} />
            </Route>
            <Route exact path="/admin/athletes" component={Athletes} />
            <Route
              exact
              path="/admin/athletes/editProfile/:id"
              component={EditUserFromParams}
            />
            <Route
              exact
              path="/admin/athletes/register"
              component={RegisterProfile}
            />
            <Route exact path="/admin/exercises" component={Exercises} />
            <Route exact path="/admin/workout/:id" component={AdminWorkout} />
            <Route
              exact
              path="/admin/exercises/addExercise"
              component={AddExercise}
            />
            <Route exact path="/admin/newWorkout" component={AddWorkout} />
            <Route
              exact
              path="/admin/activeWorkouts"
              component={AdminActiveWorkouts}
            />
            <Route
              exact
              path="/admin/previousWorkouts"
              component={AdminPreviousWorkouts}
            />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminBoard;
