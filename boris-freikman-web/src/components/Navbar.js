import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);
  const [showAdminBoard, setShowAdminBoard] = useState(props.showAdminBoard);
  const logoutHandler = props.logoutHandler;

  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn);
    setShowAdminBoard(props.showAdminBoard);
  }, [props.isLoggedIn, props.showAdminBoard]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" className={classes.title}>
            BORIS FREIKMAN
          </Typography>
          {/* ------------------------------------------------ */}
          <Link to={"/home"}>
            <Button color="inherit">Home</Button>
          </Link>

          {isLoggedIn ? (
            <div>
              {showAdminBoard ? (
                <Link to={"/admin"}>
                  <Button color="inherit">Admin</Button>
                </Link>
              ) : (
                <Link to={"/user"}>
                  <Button color="inherit">User</Button>
                </Link>
              )}

              {/* <Link to={"/login"}> */}
              <a href="/login">
                <Button onClick={logoutHandler} color="inherit">
                  Log Out
                </Button>
              </a>
              {/* </Link> */}
            </div>
          ) : (
            <div>
              <Link to={"/login"}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button color="inherit">Sign Up</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
