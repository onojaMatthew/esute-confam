const cron = require("node-cron");


// Automatically starts weekly fund accumulation
// for the group
exports.weeklyJob = (res, weeklySum, groupId) => {
  const weekly = new cron.schedule("* * 7 * *", () => {
    console.log("job started...");
    weeklySum(res, groupId);
  }, null, true, "Abidjan");
}

// Automatically remits the weekly accumulated fund of the group
// to a member on the 30 of every month
exports.monthlySettlement = (res, monthlySettlement, groupId) => {
  const monthly = new cron.schedule("* * 30 * *", () => {
    console.log("job started in 2 minutes...");
    monthlySettlement(res, groupId);
  }, null, true, "Abidjan");
}
