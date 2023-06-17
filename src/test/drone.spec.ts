import { Request, Response } from 'express';
import { DroneModel } from './../models/droneModels';
import { loadDrone, getLoadedMedications, getAvailableDrones, getBatteryLevel } from './../controllers/droneControllers';

describe('Controller', () => {
  describe('loadDrone', () => {
    it('should load medications into a drone', async () => {
      const mockRequest = {
        body: {
          droneId: 'drone-id',
          medications: ['medication1', 'medication2'],
        },
      } as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockDrone = {
        _id: 'drone-id',
        state: 'IDLE',
        weightLimit: 500,
      };
      const mockMedications = [
        { name: 'medication1', weight: 100 },
        { name: 'medication2', weight: 200 },
      ];

      jest.spyOn(DroneModel, 'findById').mockResolvedValue(mockDrone);
      jest.spyOn(DroneModel, 'findByIdAndUpdate').mockResolvedValue(mockDrone);

      await loadDrone(mockRequest, mockResponse);

      expect(DroneModel.findById).toHaveBeenCalledWith('drone-id');
      expect(DroneModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'drone-id',
        { state: 'LOADING' },
        { new: true }
      );
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Drone loaded successfully' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return an error if the drone is already in a loading state', async () => {
      const mockRequest = {
        body: {
          droneId: 'drone-id',
          medications: ['medication1'],
        },
      } as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockDrone = {
        _id: 'drone-id',
        state: 'LOADING',
      };

      jest.spyOn(DroneModel, 'findById').mockResolvedValue(mockDrone);

      await loadDrone(mockRequest, mockResponse);

      expect(DroneModel.findById).toHaveBeenCalledWith('drone-id');
      expect(DroneModel.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Drone is already in a loading state' });
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it('should return an error if the total weight of medications exceeds the drone weight limit', async () => {
      const mockRequest = {
        body: {
          droneId: 'drone-id',
          medications: ['medication1', 'medication2'],
        },
      } as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockDrone = {
        _id: 'drone-id',
        state: 'IDLE',
        weightLimit: 200,
      };

      jest.spyOn(DroneModel, 'findById').mockResolvedValue(mockDrone);

      await loadDrone(mockRequest, mockResponse);

      expect(DroneModel.findById).toHaveBeenCalledWith('drone-id');
      expect(DroneModel.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Total weight of medications exceeds the drone weight limit' });
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('checkLoadedMedications', () => {
    it('should return the loaded medications for a given drone', async () => {
      const mockRequest = {
        params: {
          droneId: 'drone-id',
        },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockDrone = {
        _id: 'drone-id',
      };
      const mockMedications = [
        { name: 'medication1', weight: 100 },
        { name: 'medication2', weight: 200 },
      ];

      jest.spyOn(DroneModel, 'findById').mockResolvedValue(mockDrone);

      await getLoadedMedications(mockRequest, mockResponse);

      expect(DroneModel.findById).toHaveBeenCalledWith('drone-id');
      expect(mockResponse.json).toHaveBeenCalledWith(mockMedications);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return an error if the drone is not found', async () => {
      const mockRequest = {
        params: {
          droneId: 'drone-id',
        },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      jest.spyOn(DroneModel, 'findById').mockResolvedValue(null);

      await getLoadedMedications(mockRequest, mockResponse);

      expect(DroneModel.findById).toHaveBeenCalledWith('drone-id');
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Drone not found' });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('getAvailableDrones', () => {
    it('should return a list of available drones', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockDrones = [
        { _id: 'drone-id1', state: 'IDLE' },
        { _id: 'drone-id2', state: 'IDLE' },
      ];

      jest.spyOn(DroneModel, 'find').mockResolvedValue(mockDrones);

      await getAvailableDrones(mockRequest, mockResponse);

      expect(DroneModel.find).toHaveBeenCalledWith({ state: 'IDLE' });
      expect(mockResponse.json).toHaveBeenCalledWith(mockDrones);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getBatteryLevel', () => {
    it('should return the battery level for a given drone', async () => {
      const mockRequest = {
        params: {
          droneId: 'drone-id',
        },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockDrone = {
        _id: 'drone-id',
        batteryCapacity: 80,
      };

      jest.spyOn(DroneModel, 'findById').mockResolvedValue(mockDrone);

      await getBatteryLevel(mockRequest, mockResponse);

      expect(DroneModel.findById).toHaveBeenCalledWith('drone-id');
      expect(mockResponse.json).toHaveBeenCalledWith({ batteryLevel: 80 });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return an error if the drone is not found', async () => {
      const mockRequest = {
        params: {
          droneId: 'drone-id',
        },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      jest.spyOn(DroneModel, 'findById').mockResolvedValue(null);

      await getBatteryLevel(mockRequest, mockResponse);

      expect(DroneModel.findById).toHaveBeenCalledWith('drone-id');
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Drone not found' });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });
});
