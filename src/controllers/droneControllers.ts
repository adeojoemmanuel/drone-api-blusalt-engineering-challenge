import { Request, Response } from "express";
import * as db from "./../database/database";

export function registerDrone(req: Request, res: Response): void {
  // Implement registering a drone
}

export function loadDrone(req: Request, res: Response): void {
  // Implement loading a drone with medications
}

export function getLoadedMedications(req: Request, res: Response): void {
  // Implement checking loaded medications for a given drone
}

export function getAvailableDrones(req: Request, res: Response): void {
  // Implement checking available drones for loading
}

export function getBatteryLevel(req: Request, res: Response): void {
  // Implement checking the drone's battery level
}
