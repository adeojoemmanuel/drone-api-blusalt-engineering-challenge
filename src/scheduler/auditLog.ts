import { Document, Schema, model } from 'mongoose';

interface AuditLog extends Document {
  droneId: string;
  eventType: 'LOW_BATTERY' | 'LOADING' | 'DELIVERY_COMPLETED';
  timestamp: Date;
}

const AuditLogSchema = new Schema<AuditLog>({
  droneId: { type: Schema.Types.ObjectId, ref: 'Drone', required: true },
  eventType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

const AuditLogModel = model<AuditLog>('AuditLog', AuditLogSchema);

export async function createAuditLog(droneId: string, eventType: 'LOW_BATTERY' | 'LOADING' | 'DELIVERY_COMPLETED'): Promise<void> {
  const log = new AuditLogModel({
    droneId,
    eventType,
  });
  await log.save();
}
