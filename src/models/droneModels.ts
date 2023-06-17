import mongoose, { Document } from 'mongoose';

interface Drone extends Document {
  serialNumber: string;
  model: 'Lightweight' | 'Middleweight' | 'Cruiserweight' | 'Heavyweight';
  weightLimit: number;
  batteryCapacity: number;
  state: 'IDLE' | 'LOADING' | 'LOADED' | 'DELIVERING' | 'DELIVERED' | 'RETURNING';
}

interface Medication extends Document {
  name: string;
  weight: number;
  code: string;
  image: string;
  drone: mongoose.Types.ObjectId;
}

const DroneSchema = new mongoose.Schema<Drone>({
  serialNumber: { type: String, required: true },
  model: { type: String, enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'], required: true },
  weightLimit: { type: Number, required: true },
  batteryCapacity: { type: Number, required: true },
  state: { type: String, enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'], required: true },
});

const MedicationSchema = new mongoose.Schema<Medication>({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
  drone: { type: mongoose.Types.ObjectId, ref: 'Drone', required: true },
});

export const DroneModel = mongoose.model<Drone>('Drone', DroneSchema);
export const MedicationModel = mongoose.model<Medication>('Medication', MedicationSchema);
