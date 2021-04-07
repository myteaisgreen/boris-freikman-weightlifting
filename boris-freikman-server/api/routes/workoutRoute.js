const { verifyWorkout } = require("../middlewares");
const controller = require("../../controllers/workoutController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // GET

  app.get(
    "/api/getAllActiveWorkouts",
    controller.getAllActiveWorkouts,
  );

  app.get(
    "/api/getAllPreviousWorkouts", 
    controller.getAllPreviousWorkouts,
  );

  app.get(
    "/api/getAdminWorkoutById",
    controller.getAdminWorkoutById,
  );

  app.get(
    "/api/getUserWorkoutById",
    controller.getUserWorkoutById
  );

  app.get(
    "/api/getUserCurrentWorkout",
    controller.getUserCurrentWorkout
  );

  app.get(
    "/api/getUserPreviousWorkouts",
    controller.getUserPreviousWorkouts
  );

  // POST

  app.post(
    "/api/addWorkout",
    [verifyWorkout.verifyAthletesExist, verifyWorkout.verifyExercisesExist],
    controller.addWorkout,
  );

};
