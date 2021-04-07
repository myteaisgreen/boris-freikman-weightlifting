const db = require("../models");
const Workout = db.workout;

exports.getNextUserWorkout = (workouts) => {
  workouts.sort((a, b) => {
    // Return the workouts array sorted by dateAndTime
    let dateA = new Date(a.dateAndTime);
    let dateB = new Date(b.dateAndTime);
    return dateA <= dateB ? 1 : -1;
  });

  return workouts[0];
};

exports.adjustWeightsUserWorkout = async (userNextWorkout, next) => {
  let userSnatchRecord = userNextWorkout.snatchRecord;
  let userCleanJerkRecord = userNextWorkout.cleanJerkRecord;
  return await Workout.findById(userNextWorkout.workout._id, "dateAndTime exercises")
  .populate({
    path: "exercises.exercise",
    select: "_id name description",
  }).exec((err, workout) => {
    if (err || !workout) {
      return;
    }
    workout.exercises.map((exercise, index) => {
        let isWeightInPercents = exercise.percentageOfExercise.localeCompare("Weight") === 0 ? false : true;
        let recordToMultiplyBy = exercise.percentageOfExercise.localeCompare("Snatch") === 0 ? userSnatchRecord : userCleanJerkRecord;
        exercise.sets.map((set, index) => {
            // If weight is in percents, we have to replace the percentage 
            // with the actual weight as a function of the user's records
            if(isWeightInPercents){
                set.weight = Math.floor((set.weight / 100) * recordToMultiplyBy);
            }
        });
    });
    next(workout);
  });
};
