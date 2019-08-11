const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
require("dotenv");

// Logs errors to database
module.exports = function () {
  // Logs uncaughtException error to file and console
  winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtException.log'}),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  )

  // Throw unhandledRejection error
  process.on('unhandledRejection', (ex) => {
      throw ex;
  });

  winston.add(winston.transports.File, { filename: 'logFile.log'});
  // Saves the error log to the database
  winston.add(winston.transports.MongoDB, { 
    db: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds139480.mlab.com:39480/${process.env.DB_NAME}`,
    level: 'info'
  });
}
