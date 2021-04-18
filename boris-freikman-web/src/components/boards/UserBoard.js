import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import EditProfile from "../EditProfile";
import Profile from "../Profile";
import UserCurrentWorkout from "../workouts/UserCurrentWorkout";
import UserPreviousWorkouts from "../workouts/UserPreviousWorkouts";
import SelectMenu from "./SelectMenu";
import RegularMenu from "./RegularMenu";

function UserBoard() {
  const currentUser = AuthService.getCurrentUser();
  const menuOptions = [
    {
      label: "Profile",
      link: "/user/profile",
    },
    {
      label: "Current Workout",
      link: "/user/currentWorkout",
    },
    {
      label: "Previous Workouts",
      link: "/user/previousWorkouts",
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
