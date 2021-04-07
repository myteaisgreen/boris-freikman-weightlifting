const controller = require("../../controllers/exerciseController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // GET 

  app.get("/api/getAllExercises", controller.getAllExercises);

  // POST

  app.post("/api/addExercise", controller.addExercise);

  app.post("/api/updateExercise", controller.updateExercise);

  // DELETE
  
  app.delete("/api/deleteExercise", controller.deleteExercise);
};
