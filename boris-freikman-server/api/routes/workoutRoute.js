const { verifyWorkout, authenticateJwt } = require("../middlewares");

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
    "/api/getAllActiveWorkouts", [authenticateJwt.verifyToken, authenticateJwt.isAdmin],
    controller.getAllActiveWorkouts,
  );

  app.get(
    "/api/getAllPreviousWorkouts", [authenticateJwt.verifyToken, authenticateJwt.isAdmin],
    controller.getAllPreviousWorkouts,
  );

  app.get(
    "/api/getAdminWorkoutById", [authenticateJwt.verifyToken, authenticateJwt.isAdmin],
    controller.getAdminWorkoutById,
  );

  app.get(
    "/api/getUserWorkoutById", [authenticateJwt.verifyToken],
    controller.getUserWorkoutById
  );

  app.get(
    "/api/getUserCurrentWorkout", [authenticateJwt.verifyToken],
    controller.getUserCurrentWorkout
  );

  app.get(
    "/api/getUserPreviousWorkouts", [authenticateJwt.verifyToken],
    controller.getUserPreviousWorkouts
  );

  // POST

  app.post(
    "/api/addWorkout",
    [authenticateJwt.verifyToken, authenticateJwt.isAdmin], [verifyWorkout.verifyAthletesExist, verifyWorkout.verifyExercisesExist],
    controller.addWorkout,
  );

};
