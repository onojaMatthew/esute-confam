const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const winston = require("winston");
const cookieParser = require("cookie-parser");
const database = require("./config/db");
const validator = require("express-validator");
const cron = require("node-cron");
const cors = require("cors");

// Create instance of express 
const app = express();

// Connection to database
database();

// Server port
const port = process.env.PORT || 4000;

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.use(validator());

// Initialize local variables
app.use((req, res, next) => {
  res.locals = {
    userType: "anonymous",
    userId: "0.0",
    role: ""
  }
  next();
});

// Custom routes
//require("./config/logger")();
require("./middleware/routes")(app);
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      error: "You must be logged in to perform this operation"
    })
  }
});

// const task = cron.schedule("0 * * * * *", () => {
//   console.log("hello from node cron");
// });

// task.start();

app.get("/", (req, res) => {
  res.json({ message: "Congrats! Your first project"});
});

// Starting and listening to server
app.listen(port, () => {
  winston.info(`Server is up and running on port ${port}`);
})