import { Divider, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/admin.service";
import AthletesListItem from "./AthletesListItem";

function Athletes() {
  const [athletes, setAthletes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    async function fetchAthletes() {
      try {
        const response = await AdminService.getAllUsersForAdminBoard();
        setAthletes(response.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAthletes();
  }, []);

  return (
    <div>
      <TextField
        fullWidth
        id="search"
        name="search"
        label="Search for an athlete..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Divider />
      <ul style={{"list-style-type": "none"}}>
        {!searchQuery &&
          athletes?.map((athlete, index) => (
            <AthletesListItem
              firstName={athlete.firstName}
              lastName={athlete.lastName}
              id={athlete._id}
              snatchRecord={athlete.snatchRecord}
              cleanJerkRecord={athlete.cleanJerkRecord}
              weight={athlete.weight}
              key={athlete.firstName+athlete.lastName}
            />
          ))}
        {searchQuery &&
          athletes?.filter(
              (athlete) =>
                athlete.firstName.includes(searchQuery) ||
                athlete.lastName.includes(searchQuery)
            )
            .map((athlete, index) => (
            <AthletesListItem
              firstName={athlete.firstName}
              lastName={athlete.lastName}
              id={athlete._id}
              snatchRecord={athlete.snatchRecord}
              cleanJerkRecord={athlete.cleanJerkRecord}
              weight={athlete.weight}
              key={athlete.firstName+athlete.lastName}
            />
            ))}
      </ul>

      <Button
        fullWidth={true}
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineOutlinedIcon />}
        component={Link} 
        to={`/admin/athletes/register`} 
      >
        Register Athlete
      </Button>
    </div>
  );
}

export default Athletes;