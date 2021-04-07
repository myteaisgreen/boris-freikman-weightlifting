import {
  Button, Divider,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import React from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import AuthService from "../services/auth.service";
import ProfileListItem from "./ProfileListItem";

function Profile(props) {
  let match = useRouteMatch();
  const currentUser = props.user ? props.user : AuthService.getCurrentUser();

  return (
    <div>
      <header>
        <h1>
          <strong>{currentUser.username}'s</strong> Profile
        </h1>
      </header>
      <List>
        {/* TODO: Return for "debugging" */}
        {/* <ProfileListItem
          title="Token"
          value={currentUser.accessToken.substring(0, 20)}
        />
        <Divider />
        <ProfileListItem title="ID" value={currentUser.id} />
        <Divider /> */} 
        <ProfileListItem title="Email" value={currentUser.email} />
        <Divider />
        <ProfileListItem title="First Name" value={currentUser.firstName}/>
        <Divider />
        <ProfileListItem title="Last Name" value={currentUser.lastName}/>
        <Divider />
        <ProfileListItem title="Weight" value={currentUser.weight}/>
        <Divider />
        <ProfileListItem title="Snatch Record" value={currentUser.snatchRecord}/>
        <Divider />
        <ProfileListItem title="Clean&Jerk Record" value={currentUser.cleanJerkRecord}/>
        <Divider />
        {/* <ListItem>
          <ListItemText>
            <strong>Authorities: </strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </ListItemText>
        </ListItem> */}
        <Divider />
      </List>
      <Button
        fullWidth={true}
        variant="contained"
        color="primary"
        startIcon={<EditOutlinedIcon />}
        component={Link} to={`${match.url}/editProfile`} 
      >
        Edit Profile
      </Button>
    </div>
  );
}

export default Profile;
