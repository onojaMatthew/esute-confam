const cron = require("node-cron");

module.exports = (res, weeklySum, groupId) => {
  cron.schedule("0 * * * * *", () => {
    console.log("job started...");
    weeklySum(res, groupId);
  });
}