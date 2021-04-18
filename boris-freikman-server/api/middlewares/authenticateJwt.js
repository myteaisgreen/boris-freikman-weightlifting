const jwt = require("jsonwebtoken");
const config = require("../../config/jwtSecret.js");
const db = require("../../models");
const User = db.user;
const Role = db.role;

/*
Verify JWT
*/

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
  if (!token) {
    // If there is no token at all
    return res.status(403).send({ message: "No token provided!" });
  }
  // Below is the actual verification
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const authenticateJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authenticateJwt;
