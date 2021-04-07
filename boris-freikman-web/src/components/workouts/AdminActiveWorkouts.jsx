import React, { useState, useEffect, useCallback } from "react";
import AdminService from "../../services/admin.service";
import WorkoutsListItem from './WorkoutsListItem';

function ActiveWorkouts() {
  const [workouts, setWorkouts] = useState();

  const fetchAllActiveWorkouts = useCallback(async () => {
    const workouts = await AdminService.getAllActiveWorkouts();
    if(workouts.length > 0){
        setWorkouts(workouts);
    }
  }, []);

  useEffect(() => {
    fetchAllActiveWorkouts();
  }, [fetchAllActiveWorkouts]);

  return (
    <div>
        {workouts ? 
        <h1>These are all the active workouts</h1> 
        : <h1>There are no active workouts at the time</h1>}
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

export default ActiveWorkouts;
