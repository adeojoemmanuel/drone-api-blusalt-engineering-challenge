const drones: Drone[] = [];
const medications: Medication[] = [];

export function getDrones(): Drone[] {
  return drones;
}

export function getMedications(): Medication[] {
  return medications;
}

export function addDrone(drone: Drone): void {
  drones.push(drone);
}

export function addMedication(medication: Medication): void {
  medications.push(medication);
}

