const userRoutes = require("../logic/users/api");
const groupRoutes = require("../logic/group/api");

// Route middleware
module.exports = function(app) {
  app.use("/api", userRoutes);
  app.use("/api", groupRoutes);
}