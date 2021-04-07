import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

function ProfileListItem(props) {
    const title = props.title;
    const value = props.value;
    return (
        <div>
            <ListItem>
                <ListItemText>
                    <strong>{title}: </strong>{" "}{value}
                </ListItemText>
          </ListItem>
        </div>
    )
}

export default ProfileListItem
