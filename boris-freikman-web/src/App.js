import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminBoard from "./components/boards/AdminBoard";
import UserBoard from "./components/boards/UserBoard";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import AuthService from "./services/auth.service";
import theme from "./themes/index";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    window.location.replace("http://localhost:8081/");
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar
            showAdminBoard={this.state.showAdminBoard}
            currentUser={this.state.currentUser}
            logoutHandler={this.logOut}
          />
          <Grid container justify="center" alignItems="center">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={UserBoard} />
              <Route path="/admin" component={AdminBoard} />
            </Switch>
          </Grid>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
