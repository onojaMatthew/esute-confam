const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.requireLogin = (req, res, next) => {
  const token = req.header("x-auth-token");
  if(!token) return res.status(403).json({
    error: "Access denied. Log in to continue"
  });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode;
    next();
  } catch(err) {
    return res.status(401).json({
      error: "Invalid token"
    });
  }
};
