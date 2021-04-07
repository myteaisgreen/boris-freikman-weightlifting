const controller = require("../../controllers/userController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // GET

  app.get("/api/getUserById", controller.getUserById);

  app.get("/api/getAllUsersForAdminBoard", controller.getAllUsersForAdminBoard);

  // POST

  app.post("/api/updateUserById", controller.updateUserById);
};
