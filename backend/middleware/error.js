const winston = require("winston");

// 500 status code error handler
module.exports = function(err, req, res, next) {
  winston.error(err.message, err);

  res.status(500).json(err.message);
}