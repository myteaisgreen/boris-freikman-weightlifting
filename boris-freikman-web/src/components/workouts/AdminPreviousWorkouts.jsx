import React, { useState, useEffect, useCallback } from "react";
import AdminService from "../../services/admin.service";
import WorkoutsListItem from './WorkoutsListItem';

function PreviousWorkouts() {
  const [workouts, setWorkouts] = useState();

  const fetchAllPreviousWorkouts = useCallback(async () => {
    const workouts = await AdminService.getAllPreviousWorkouts();
    if(workouts.length > 0){
        setWorkouts(workouts);
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

export default PreviousWorkouts;
