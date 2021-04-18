const config = require("../config/jwtSecret");
const service = require("../services/workoutService");
const db = require("../models");
const Workout = db.workout;
const User = db.user;

exports.addWorkout = (req, res) => {
  Workout.findOne({
    dateAndTime: req.body.dateAndTime,
  }).exec((err, workout) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (workout) {
      return res.status(400).send({
        message: `Failed! Workout ${workout.dateAndTime} already exists!`,
      });
    }

    const newWorkout = new Workout({
      dateAndTime: req.body.dateAndTime,
      athletes: req.body.athletes,
      exercises: req.body.exercises,
    });

    newWorkout.save((err, workout) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      // Add the new workout to every athlete that has been signed
      let athletes = req.body.athletes;
      athletes.map((athlete, index) => {
        let workoutForUser = {
          workout: workout._id,
          snatchRecord: athlete.snatchRecord,
          cleanJerkRecord: athlete.cleanJerkRecord,
        };
        User.findByIdAndUpdate(
          { _id: athlete.athlete },
          { $push: { workouts: workoutForUser } }
        ).exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
          }

          if (!user) {
            res.status(400).send({
              message: `Failed! User ${athlete.athlete} doesn't exist!`,
            });
          }
        });
      });

      res.status(200).send({
        message: "Workout was added successfully!",
      });
    });
  });
};

exports.getAllActiveWorkouts = (req, res) => {
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 12);
  Workout.find({dateAndTime : {$gte: currentDate}}, '_id dateAndTime')
  .exec((err, workouts) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (workouts) {
      workouts.sort((a, b) => { // Return the workouts array sorted by dateAndTime
        let dateA = new Date(a.dateAndTime);
        let dateB = new Date(b.dateAndTime);
        return dateA <= dateB ? -1 : 1; 
      });

      res.status(200).send({
        message: "These are all the active workouts!",
        workouts: workouts
      });
    }
  });
};

exports.getAllPreviousWorkouts = (req, res) => {
  Workout.find({dateAndTime : {$lt: new Date()}}, '_id dateAndTime')
  .exec((err, workouts) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (workouts) {
      workouts.sort((a, b) => { // Return the workouts array sorted by dateAndTime
        let dateA = new Date(a.dateAndTime);
        let dateB = new Date(b.dateAndTime);
        return dateA <= dateB ? 1 : -1; 
      });

      res.status(200).send({
        message: "These are all the previous workouts!",
        workouts: workouts
      });
    }
  });
};

exports.getAdminWorkoutById = (req, res) => {
  Workout.findOne({
    _id: req.body._id || req.query._id
  }, 'dateAndTime athletes exercises')
  .populate(
    {
      path: 'athletes.athlete',
      select: '_id firstName lastName'
    }
    )
  .populate(
    {
      path: 'exercises.exercise', 
      select: '_id name description'
  })
  .exec((err, workout) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!workout) {
      return res.status(404).send({ message: "Workout Not found." });
    }

    return res.status(200).send({workout: workout, message: "Workout Found."})
  })
};

exports.getUserWorkoutById = (req, res) => {
  Workout.findOne({
    _id: req.body._id || req.query._id
  }, 'dateAndTime exercises')
  .populate(
    {
      path: 'exercises.exercise', 
      select: '_id name description'
  })
  .exec((err, workout) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!workout) {
      return res.status(404).send({ message: "Workout Not found." });
    }

    return res.status(200).send({workout: workout, message: "Workout Found."})
  })
};

exports.getUserCurrentWorkout = (req, res) => {
  User.findById({
    _id: req.body._id || req.query._id
  }, 'workouts')
  .populate(
    {
      path: 'workouts.workout', 
      select: '_id dateAndTime'
  })
  .exec(async (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if(user.workouts.length < 1) {
      return res.status(200).send({message: "No active workout"});
    }

    let userNextWorkout = service.getNextUserWorkout(user.workouts);
    // FIXME: REFACTOR
    let next = (adjustedNextUserWorkout) => {
      if(adjustedNextUserWorkout){
        return res.status(200).send({workout: adjustedNextUserWorkout, message: "User's next workout!"})
      }

      return res.status(500).send({message: "Error! No adjusted workout to show!"});
    }
    service.adjustWeightsUserWorkout(userNextWorkout, next);
  });
};

exports.getUserPreviousWorkouts = (req, res) => {
  User.findById({
    _id: req.body._id || req.query._id
  }, 'workouts')
  .populate(
    {
      path: 'workouts.workout', 
      select: '_id dateAndTime'
  })
  .exec(async (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    let currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 12);
    let workouts = user.workouts.filter(workout => new Date(workout.workout.dateAndTime) <= currentTime);
    
    return res.status(200).send({workouts: workouts, message: "User's previous workouts!"});
  });
};