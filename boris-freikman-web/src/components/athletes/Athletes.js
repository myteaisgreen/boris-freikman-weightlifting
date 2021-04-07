import { Divider, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/admin.service";
import AthletesListItem from "./AthletesListItem";

function Athletes() {
  const [athletes, setAthletes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAthletes = useCallback(async () => {
    const usersForAdminBoard = await AdminService.getAllUsersForAdminBoard();
    setAthletes(usersForAdminBoard);
  }, []);

  useEffect(() => {
    fetchAthletes();
  }, [fetchAthletes]);

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
      <ul>
        {!searchQuery &&
          athletes &&
          athletes.map((athlete, index) => (
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
          athletes &&
          athletes
            .filter(
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