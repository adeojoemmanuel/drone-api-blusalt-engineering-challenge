import { Request, Response } from 'express';
import { DroneModel, MedicationModel } from './../models/droneModels';

export async function registerDrone(req: Request, res: Response): Promise<void> {
  try {
    const { serialNumber, model, weightLimit, batteryCapacity, state } = req.body;
    const drone = await DroneModel.create({
      serialNumber,
      model,
      weightLimit,
      batteryCapacity,
      state,
    });
    res.json(drone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register drone' });
  }
}

export async function loadDrone(req: Request, res: Response): Promise<void> {
  try {
    const { droneId, medicationIds } = req.body;
    const drone = await DroneModel.findById(droneId);
    if (!drone) {
      res.status(404).json({ error: 'Drone not found' });
      return;
    }
    const medications = await MedicationModel.find({ _id: { $in: medicationIds } });
    if (medications.length !== medicationIds.length) {
      res.status(404).json({ error: 'One or more medications not found' });
      return;
    }
    const totalWeight = medications.reduce((acc:any, medication:any) => acc + medication.weight, 0);
    if (totalWeight > drone.weightLimit) {
      res.status(400).json({ error: 'Exceeded drone weight limit' });
      return;
    }
    drone.state = 'LOADING';
    await drone.save();
    await MedicationModel.updateMany({ _id: { $in: medicationIds } }, { drone: droneId });
    res.json(drone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load drone with medications' });
  }
}

export async function getLoadedMedications(req: Request, res: Response): Promise<void> {
  try {
    const { droneId } = req.params;
    const medications = await MedicationModel.find({ drone: droneId });
    res.json(medications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve loaded medications' });
  }
}

export async function getAvailableDrones(req: Request, res: Response): Promise<void> {
  try {
    const drones = await DroneModel.find({ state: 'IDLE' });
    res.json(drones);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve available drones' });
  }
}

export async function getBatteryLevel(req: Request, res: Response): Promise<void> {
  try {
    const { droneId } = req.params;
    const drone = await DroneModel.findById(droneId);
    if (!drone) {
      res.status(404).json({ error: 'Drone not found' });
      return;
    }
    res.json({ batteryLevel: drone.batteryCapacity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve drone battery level' });
  }
}
