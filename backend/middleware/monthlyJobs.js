const cron = require("node-cron");

exports.monthlySettlement = (res, monthlySettlement, groupId) => {
  const monthlyJob = new cron.schedule("2 * * * *", () => {
    console.log("job started in 2 minutes...");
    monthlySettlement(res, groupId);
  }, null, true, "Abidjan");

  return monthlyJob;
}