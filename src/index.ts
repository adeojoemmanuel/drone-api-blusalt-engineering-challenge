import express from 'express';
import * as controllers from './controllers/droneControllers';

const app = express();
const port = 3000;

app.use(express.json());

// Define the routes
app.post('/drones/register', controllers.registerDrone);
app.post('/drones/load', controllers.loadDrone);
app.get('/drones/:droneId/medications', controllers.getLoadedMedications);
app.get('/drones/available', controllers.getAvailableDrones);
app.get('/drones/:droneId/battery', controllers.getBatteryLevel);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
