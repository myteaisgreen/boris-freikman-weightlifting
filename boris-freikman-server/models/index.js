const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Probably deprecated, "Mongoose 5.0 will use native promises by default"

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.exercise = require('./exercise')
db.workout = require('./workout')

db.ROLES = ["user", "admin"];

module.exports = db;
