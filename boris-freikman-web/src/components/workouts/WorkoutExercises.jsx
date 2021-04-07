import { Divider } from "@material-ui/core";
import React from "react";

function WorkoutExercises({ exercises }) {
  const isExercisesWeightAPercentage = (percentageOfExercise) => {
    if (!percentageOfExercise.localeCompare("Weight")) {
      return false;
    }

    return true;
  };

  return (
    <div>
      {exercises &&
        exercises.map((exerciseObj, index) => {
          let exercise = exerciseObj.exercise;
          let isPercentage = isExercisesWeightAPercentage(exerciseObj.percentageOfExercise);
          let sets = exerciseObj.sets;

          return (
            <li key={exercise._id}>
              <h3>{exercise.name}</h3>
              <h4>{exercise.description}</h4>

              {isPercentage && (<h5>Weight are percentage of user's {exerciseObj.percentageOfExercise} PR</h5>)}

              {exerciseObj.notes && <h5>Notes! {exerciseObj.notes}</h5>}
              <ul>
                {sets &&
                  sets.map((set, index) => {
                    return (
                      <div key={set.order}>
                        <h5>Repeat set - {set.repeatSet}</h5>
                        <div>
                          <h5>Weight - {set.weight}</h5>
                          <h5>Reps - {set.reps}</h5>
                        </div>
                        <Divider/>
                      </div>
                    );
                  })}
              </ul>
            </li>
          );
        })}
    </div>
  );
}

export default WorkoutExercises;
