import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import WorkoutExercises from './WorkoutExercises';

function UserCurrentWorkout() {
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
    try {
      const currentUser = await AuthService.getCurrentUser();
      const response = await UserService.getUserCurrentWorkout(currentUser._id);
      if(response.data.workout){
        setWorkout(response.data.workout);
        setWhen(response.datatworkout.dateAndTime);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchWorkout();
  }, [fetchWorkout]);

  return (
    <div>
      {workout ? 
      <div>
        <h1>When?</h1>
        <h3>{dateAndTime}</h3>
        <h1>What?</h1>
        <ol>
          {workout && workout.exercises && <WorkoutExercises exercises={workout.exercises}/>}
        </ol>
      </div> 
      : <h1>There is no current workout</h1>}
    </div>
  );
}

export default UserCurrentWorkout;