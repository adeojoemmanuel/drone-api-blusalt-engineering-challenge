# Drone API

This repository contains a REST API for managing drones and medication delivery.

## Prerequisites

- Node.js (version 16.X.X or higher)
- MongoDB (version 6.X.X or higher)

## Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your-username/drone-api.gi```

2. Navigate to the project directory:

    ``` cd drone-api  ```

3. Install dependencies using npm:

    ```npm install ```

4. Configure the MongoDB connection:

    edit the env.example to .env file in the project's root directory.
    Modify the MONGO_URI value to match your MongoDB connection URI.

5. Start the MongoDB server:

    - Open a new terminal window.

    - Run the following command to start the MongoDB server:

    ```mongod```

6. Build and run the project:

    - npm run build
    - npm start

    The API server should now be running on http://localhost:3000.

## Usage
    - API endpoints can be accessed using an HTTP client (e.g., cURL, Postman).

    ``` 
    {{baseurl}}/drones/register : registerDrone
    {{baseurl}}/drones/load : loadDrone
    {{baseurl}}/drones/:droneId/medications : getLoadedMedications
    {{baseurl}}/drones/available: getAvailableDrones
    {{baseurl}}/drones/:droneId/battery: getBatteryLevel 
    ```

    using this schema

    ``` 
        const DroneSchema = new Schema<Drone>({
            serialNumber: { type: String, required: true },
            model: { type: String, enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'], required: true },
            weightLimit: { type: Number, required: true },
            batteryCapacity: { type: Number, required: true },
            state: { type: String, enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'], required: true },
        });

        const MedicationSchema = new Schema<Medication>({
            name: { type: String, required: true },
            weight: { type: Number, required: true },
            code: { type: String, required: true },
            image: { type: String, required: true },
            drone: { type: Types.ObjectId, ref: 'Drone', required: true },
        });
    ```

    - Refer to the API documentation for detailed information on available endpoints and request/response formats.

## Testing

To run the unit tests, use the following command:

    ```npm test```

## License
This project is licensed under the MIT License.


This README provides an overview of the installation process, usage instructions, testing, contribution guidelines, and license information. Feel free to customize it based on your specific project requirements.

I hope this helps! Let me know if you have any further questions.
