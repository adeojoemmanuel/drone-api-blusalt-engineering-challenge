import { DroneModel } from './../models/droneModels';
import { createAuditLog } from './auditLog';

export async function scheduleBatteryCheck(): Promise<void> {
  setInterval(async () => {
    try {
      const drones = await DroneModel.find();
      for (const drone of drones) {
        const { batteryCapacity, _id: droneId } = drone;
        if (batteryCapacity < 25) {
          await createAuditLog(droneId, 'LOW_BATTERY');
        }
      }
    } catch (error) {
      console.error('Battery check failed:', error);
    }
  }, 24 * 60 * 60 * 1000); // Run every 24 hours
}
