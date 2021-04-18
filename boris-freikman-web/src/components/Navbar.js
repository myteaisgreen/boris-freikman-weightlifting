import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({
  showAdminBoard,
  currentUser,
  logoutHandler,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser);
  const [showAdminBoardLink, setShowAdminBoardLink] = useState(showAdminBoard);
  const classes = useStyles();

  useEffect(() => {
    setIsLoggedIn(currentUser);
    setShowAdminBoardLink(showAdminBoard);
  }, [currentUser, showAdminBoard]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <FitnessCenterIcon/>
          <Typography variant="h6" className={classes.title}>
            BORIS FREIKMAN
          </Typography>
          <Button component={Link} to={"/home"} color="inherit">
            Home
          </Button>
          {isLoggedIn ? (
            <div>
              {showAdminBoardLink ? (
                <Button component={Link} to={"/admin"} color="inherit">
                  Admin
                </Button>
              ) : (
                <Button component={Link} to={"/user"} color="inherit">
                  User
                </Button>
              )}
              <Button onClick={logoutHandler} color="inherit">
                Log Out
              </Button>
            </div>
          ) : (
            <Button component={Link} to={"/login"} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
