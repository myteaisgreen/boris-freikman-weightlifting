const mongoose = require("mongoose");

const Workout = mongoose.model(
  "Workout",
  new mongoose.Schema({
    dateAndTime: Date,
    athletes: [
      { 
        _id: false,
        athlete: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        completedWorkout: { type: Boolean, default: false },
      },
    ],
    exercises: [
      {
        _id: false,
        order: Number, 
        exercise: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
        },
        percentageOfExercise: String, // "Snatch/Clean&Jerk/Weight"
        sets: [
          {
            _id: false,
            order: Number,
            reps: String, // For cases such as: 50 kg, *3+3* (3 cleans and 3 fsquats)
            repeatSet: Number, 
            weight: Number, // Actual weight or percentage of record in another exercise
          },
        ],
        notes: String
      },
    ],
  })
);

module.exports = Workout;