import cron from "node-cron";
import * as db from "./../database/database";

cron.schedule("0 * * * *", () => {
  // Check battery levels of drones and create history/audit event logs
});
