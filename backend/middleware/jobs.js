const cron = require("node-cron");





// const cron2 = new CronJob('5 * * * * *', function () {
//   console.log('5')
// }, null, true, 'America/Chicago');

exports.weeklyJob = (res, weeklySum, groupId) => {
  const weekly = new cron.schedule("* * * * *", () => {
    console.log("job started...");
    weeklySum(res, groupId);
  }, null, true, "Abidjan");
}

exports.monthlySettlement = (res, monthlySettlement, groupId) => {
  const monthly = new cron.schedule("2 * * * *", () => {
    console.log("job started in 2 minutes...");
    monthlySettlement(res, groupId);
  }, null, true, "Abidjan");
}
