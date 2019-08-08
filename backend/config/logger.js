const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
require("dotenv");

// Logs errors to db
module.exports = function () {
  winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtException.log'}),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  )

  process.on('unhandledRejection', (ex) => {
      throw ex;
  });

  winston.add(winston.transports.File, { filename: 'logFile.log'});
  winston.add(winston.transports.MongoDB, { 
    db: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds139480.mlab.com:39480/${process.env.DB_NAME}`,
    level: 'info'
  });
}
