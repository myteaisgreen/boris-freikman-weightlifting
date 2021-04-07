require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const app = express();
const Role = db.role;
const dbConfig = require("./config/db");

var corsOptions = {
  origin: process.env.CORS_OPTIONS_ORIGIN,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Boris-Freikman.co.il" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `##################################\n✌️Server is running on port ${PORT}.\n##################################`
    );
});


db.mongoose
  .connect(dbConfig.LocalDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(
      `#################################\n✌️Successfully connected to MongoDB.\n#################################`
      );
    initializeRoles();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initializeRoles() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("Added 'user' to Roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("Added 'admin' to Roles collection");
      });
    }
  });
}

// Routes
require("./api/routes/authenticationRoute")(app);
require("./api/routes/userRoute")(app);
require("./api/routes/exerciseRoute")(app);
require("./api/routes/workoutRoute")(app);
require("./api/routes/testRoute")(app);