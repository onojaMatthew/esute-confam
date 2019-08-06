const userRoutes = require("../logic/users/api");
const groupRoutes = require("../logic/group/api");

module.exports = function(app) {
  app.use("/api", userRoutes);
  app.use("/api", groupRoutes);
}