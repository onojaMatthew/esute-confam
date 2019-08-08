const mongoose = require("mongoose");
const winston = require("winston");

require("dotenv").config();

module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds139480.mlab.com:39480/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
    .then(() => {
      winston.info("Connection to database established");
    })
    .catch(err => {
      winston.error(`Failed to connect to db. ${err.message}`);
    });
}