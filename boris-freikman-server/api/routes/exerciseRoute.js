const controller = require("../../controllers/exerciseController");
const { authenticateJwt } = require("../middlewares");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // GET 

  app.get("/api/getAllExercises", [authenticateJwt.verifyToken, authenticateJwt.isAdmin], controller.getAllExercises);

  // POST

  app.post("/api/addExercise", [authenticateJwt.verifyToken, authenticateJwt.isAdmin], controller.addExercise);

  app.post("/api/updateExercise", [authenticateJwt.verifyToken, authenticateJwt.isAdmin], controller.updateExercise);

  // DELETE
  
  app.delete("/api/deleteExercise", [authenticateJwt.verifyToken, authenticateJwt.isAdmin], controller.deleteExercise);
};
