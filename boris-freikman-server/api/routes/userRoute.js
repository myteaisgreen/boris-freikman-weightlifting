const controller = require("../../controllers/userController");
const { verifySignUp, authenticateJwt } = require("../middlewares");

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
    "/api/getUserById",
    authenticateJwt.verifyToken,
    controller.getUserById
  );

  app.get(
    "/api/getAllUsersForAdminBoard",
    [authenticateJwt.verifyToken, authenticateJwt.isAdmin],
    controller.getAllUsersForAdminBoard
  );

  // POST

  app.post(
    "/api/registerNewUser",
    [authenticateJwt.verifyToken, authenticateJwt.isAdmin],
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    controller.registerNewUser
  );

  app.post(
    "/api/updateUserById",
    authenticateJwt.verifyToken,
    controller.updateUserById
  );
};
