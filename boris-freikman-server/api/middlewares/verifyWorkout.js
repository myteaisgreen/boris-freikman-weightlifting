const db = require("../../models");
const User = db.user;
const Exercise = db.exercise;

verifyAthletesExist = (req, res, next) => {
  let athletes = req.body.athletes;
  athletes.map((athlete, index) => {
      User.findById(athlete.athlete)
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
            }

            if(!user) {
                res.status(400).send({message: `Failed! User ${athlete.athlete} doesn't exist!`})
            }
        });
  });

  next();
};

verifyExercisesExist = (req, res, next) => {
  let exercises = req.body.exercises;
  exercises.map((exercise, index) => {
      Exercise.findById(exercise.exercise)
        .exec((err, exercise) => {
            if (err) {
                res.status(500).send({message: err});
            }

            if(!exercise) {
                res.status(400).send({message: `Failed! Exercise ${exercise.exercise} doesn't exist!`})
            }
        });
  });
  
  next();
};

const verifyWorkout = {
  verifyAthletesExist,
  verifyExercisesExist,
};

module.exports = verifyWorkout;
