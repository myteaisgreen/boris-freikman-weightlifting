import React, { useState, useEffect, useCallback } from "react";
import AdminService from "../../services/admin.service";
import WorkoutsListItem from './WorkoutsListItem';
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

function UserPreviousWorkouts() {
  const [workouts, setWorkouts] = useState();

  const fetchAllPreviousWorkouts = useCallback(async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      const response = await UserService.getUserPreviousWorkouts(currentUser._id);
      let workouts = response.data.workouts;
      if(workouts.length > 0){
          setWorkouts(workouts);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAllPreviousWorkouts();
  }, [fetchAllPreviousWorkouts]);

  return (
    <div>
        {workouts ? 
        <h1>These are all the previous workouts</h1> 
    : <h1>There are no previous workouts at the time</h1>}
      {workouts &&
        workouts.map((workout, index) => (
          <WorkoutsListItem 
          key={workout._id}
          dateAndTime={workout.dateAndTime} 
          id={workout._id}
          />
        ))}
    </div>
  );
}

export default UserPreviousWorkouts;
