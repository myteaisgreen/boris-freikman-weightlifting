const config = require("../config/jwtSecret");
const db = require("../models");
var bcrypt = require("bcryptjs");
const User = db.user;
const Role = db.role;

var bcrypt = require("bcryptjs");

exports.registerNewUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    weight: req.body.weight,
    snatchRecord: req.body.snatchRecord,
    cleanJerkRecord: req.body.cleanJerkRecord,
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            return res.status(500).send({ message: err });
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              return res.status(500).send({ message: err });
            }

            res.send({ message: `User ${user.firstName} ${user.lastName} was successfully registered!` });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          return res.status(500).send({ message: err });
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }

          res.send({ message: `User ${user.firstName} ${user.lastName} was successfully registered!` });
        });
      });
    }
  });
};

exports.getUserById = (req, res) => {
    User.findOne({
      _id: req.query._id
    }, 'username email firstName lastName weight snatchRecord cleanJerkRecord'
    ).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      return res.status(200).send({user: user, message: "User Found."})
    })
};
  
  
  exports.getAllUsersForAdminBoard = (req, res) => {
    User.find(
      {},
      '_id firstName lastName weight snatchRecord cleanJerkRecord roles'
      // Above are the fields presented in ADMIN BOARD/ATHLETES
    ).exec((err, users) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
  
      if (users) {
        users = users.filter((user => user.roles && user.roles.length < 2));
        return res.status(200).send({
          users: users, message: "These are all the users!"
        });
      }
    });
  };
  
  exports.updateUserById = (req, res) => {
    User.findOne(
      {
        _id: req.body._id,
      }
    ).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
  
      if (!user) {
        return res.status(500).send({
          message: `User wasn't found`,
        });
      }
  
        if(req.body.username) user.username = req.body.username;
        if(req.body.email) user.email = req.body.email;
        if(req.body.firstName) user.firstName = req.body.firstName;
        if(req.body.lastName) user.lastName = req.body.lastName; 
        if(req.body.weight) user.weight = req.body.weight;
        if(req.body.snatchRecord) user.snatchRecord = req.body.snatchRecord;
        if(req.body.cleanJerkRecord) user.cleanJerkRecord = req.body.cleanJerkRecord;
      
        user.save((err, user) => {
          if (err) {
            return res.status(500).send({ message: err});
          }
  
          res.status(200).send({message: `User ${user.firstName} ${user.lastName} was successfully edited!`})
        })
    });
  }
  