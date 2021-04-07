import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminService from "../../services/admin.service";
import WorkoutExercises from './WorkoutExercises';

function AdminWorkout() {
  let { id } = useParams();
  const [workout, setWorkout] = useState();
  const [dateAndTime, setDateAndTime] = useState();

  const setWhen = (dateAndTime) => {
    let date = new Date(Date.parse(dateAndTime));
    let dateOptions = {
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    setDateAndTime(date.toLocaleString("en-IL", dateOptions));
  };

  const fetchWorkout = useCallback(async () => {
    const workout = await AdminService.getAdminWorkoutById(id);
    setWorkout(workout);
    setWhen(workout.dateAndTime);
  }, []);

  useEffect(() => {
    fetchWorkout();
  }, [fetchWorkout]);

  return (
    <div>
      <h1>When?</h1>
      <h3>{dateAndTime}</h3>
      <h1>Who?</h1>
      <ul>
        {workout &&
          workout.athletes &&
          workout.athletes.map((athleteObj, index) => {
            let athlete = athleteObj.athlete;
            return (
              <li key={athlete._id}>
                <h3>
                  {athlete.firstName} {athlete.lastName}
                </h3>
              </li>
            );
          })}
      </ul>
      <h1>What?</h1>
      <ol>
        {workout && workout.exercises && <WorkoutExercises exercises={workout.exercises}/>}
      </ol>

    </div>
  );
}

export default AdminWorkout;
