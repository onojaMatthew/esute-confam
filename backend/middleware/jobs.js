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


