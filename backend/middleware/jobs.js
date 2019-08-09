const cron = require("node-cron");


// Automates weekly fund addition for the group
exports.weeklyJob = (res, weeklySum, groupId) => {
  const weekly = new cron.schedule("* * * * *", () => {
    console.log("job started...");
    weeklySum(res, groupId);
  }, null, true, "Abidjan");
}

// Automates monthly fund remittance to members of the group
exports.monthlySettlement = (res, monthlySettlement, groupId) => {
  const monthly = new cron.schedule("2 * * * *", () => {
    console.log("job started in 2 minutes...");
    monthlySettlement(res, groupId);
  }, null, true, "Abidjan");
}
