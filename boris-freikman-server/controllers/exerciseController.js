const config = require("../config/jwtSecret");
const db = require("../models");
const Exercise = db.exercise;

exports.addExercise = (req, res) => {
    Exercise.findOne({
      name: req.body.name,
    }).exec((err, exercise) => {
      if (err) {
        return res.status(500).send({ message: err});
      }
  
      if (exercise) {
        return res.status(400).send({ message: `Failed! Exercise ${exercise.name} already exists!` });
      }
  
      const newExercise = new Exercise({
        name: req.body.name,
        description: req.body.description,
      });
  
      newExercise.save((err, exercise) => {
        if (err) {
          return res.status(500).send({ message: err});
        }
  
        res.status(200).send({
          exercise: exercise,
          message: "Exercise was added successfully!",
        });
      });
    });
  };
  
  exports.updateExercise = (req, res) => {
    Exercise.findOneAndUpdate(
      {
        name: req.body.name,
      },
      { description: req.body.description }
    ).exec((err, exercise) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (exercise) {
        res.status(200).send({
          message: `Exercise ${exercise.name} was edited successfully! The description now is - ${exercise.description}`,
        });
      }
    });
  };
  
  exports.getAllExercises = (req, res) => {
    Exercise.find(
      {},
      'name description _id'
    ).exec((err, exercises) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
  
      if (exercises) {
        res.status(200).send({
          exercises: exercises, message: "These are all the exercises!"
        });
      }
    });
  };

  exports.deleteExercise = (req, res) => {
    Exercise.deleteOne({name: req.body.name})
    .exec((err, {n, ok, deletedCount}) => {
      if (err) {
        res.status(500).send({ message: err});
      }
      
      if(deletedCount){ // If actually found and deleted the exercise
        res.status(200).send({
          message: `Exercise ${req.body.name} was deleted successfully!`
        })
      }
      else {
        res.status(200).send({
          message: "No exercise for deletion was found"
        })
      }
    })
  }