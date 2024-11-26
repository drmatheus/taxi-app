import { PrismaClient } from '@prisma/client';
import { RideRepository } from '../../../repositories/ride/ride';

describe('RideRepository', () => {
  const prismaMock = {
    ride: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };
  let rideRepository: RideRepository;

  beforeEach(() => {
    rideRepository = new RideRepository(prismaMock as unknown as PrismaClient);
  });

  describe('create', () => {
    it('should create a new ride', async () => {
      const data = {
        customer_id: '1',
        driver_id: 1,
        destination: 'Av. João Wallig 1800, Porto Alegre',
        origin: 'Tv. São José 455 Navegantes, Porto Alegre',
        value: 25,
        duration: '5 min e 20 seg',
        distance: 10000,
      };

      const createdRide = { id: 1, date: new Date(), ...data };
      prismaMock.ride.create.mockResolvedValue(createdRide);

      const result = await rideRepository.create(data);

      expect(prismaMock.ride.create).toHaveBeenCalledWith({
        data: { date: expect.any(Date), ...data },
      });
      expect(result).toEqual(createdRide);
    });

    it('should throw an error when creation fails', async () => {
      prismaMock.ride.create.mockRejectedValue(new Error('Database error'));

      await expect(
        rideRepository.create({
          customer_id: '1',
          driver_id: 1,
          destination: 'Invalid Address',
          origin: 'Unknown',
          value: -10,
          duration: '0 min',
          distance: 0,
        })
      ).rejects.toThrow('Database error');
    });
  });

  describe('getOne', () => {
    it('should return a ride by id', async () => {
      const ride = {
        id: 1,
        customer_id: '1',
        driver_id: 1,
        destination: 'Av. João Wallig 1800, Porto Alegre',
        origin: 'Tv. São José 455 Navegantes, Porto Alegre',
        value: 25,
        duration: '5 min e 20 seg',
        distance: 10000,
        date: new Date(),
        driver: { id: 1, name: 'John Doe' },
      };

      prismaMock.ride.findUnique.mockResolvedValue(ride);

      const result = await rideRepository.getOne(1);

      expect(prismaMock.ride.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          driver: {
            select: { id: true, name: true },
          },
        },
      });
      expect(result).toEqual(ride);
    });

    it('should return null if ride is not found', async () => {
      prismaMock.ride.findUnique.mockResolvedValue(null);

      const result = await rideRepository.getOne(999);

      expect(prismaMock.ride.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
        include: {
          driver: {
            select: { id: true, name: true },
          },
        },
      });
      expect(result).toBeNull();
    });
  });

  describe('getAll', () => {
    it('should return all rides matching the filter', async () => {
      const rides = [
        { id: 1, customer_id: '1', driver_id: 1, date: new Date() },
        { id: 2, customer_id: '1', driver_id: 1, date: new Date() },
      ];

      prismaMock.ride.findMany.mockResolvedValue(rides);

      const result = await rideRepository.getAll({ customer_id: '1' });

      expect(prismaMock.ride.findMany).toHaveBeenCalledWith({
        where: {
          customer_id: '1',
          driver_id: undefined,
        },
        select: {
          id: true,
          customer_id: true,
          destination: true,
          origin: true,
          value: true,
          duration: true,
          distance: true,
          date: true,
          driver: {
            select: {
              id: true,
              name: true,
            },
          },
        },

        orderBy: undefined,
      });
      expect(result).toEqual(rides);
    });

    it('should return sorted rides when orderBy is provided', async () => {
      const rides = [
        { id: 2, customer_id: '1', driver_id: 1, date: new Date() },
        { id: 1, customer_id: '1', driver_id: 1, date: new Date() },
      ];

      prismaMock.ride.findMany.mockResolvedValue(rides);

      const result = await rideRepository.getAll(
        { customer_id: '1' },
        { field: 'date', order: 'asc' }
      );

      expect(prismaMock.ride.findMany).toHaveBeenCalledWith({
        where: {
          customer_id: '1',
          driver_id: undefined,
        },
        select: {
          id: true,
          customer_id: true,
          destination: true,
          origin: true,
          value: true,
          duration: true,
          distance: true,
          date: true,
          driver: {
            select: {
              id: true,
              name: true,
            },
          },
        },

        orderBy: { date: 'asc' },
      });
      expect(result).toEqual(rides);
    });

    it('should throw an error when Prisma fails', async () => {
      prismaMock.ride.findMany.mockRejectedValue(new Error('Database error'));

      await expect(rideRepository.getAll({})).rejects.toThrow('Database error');
    });
  });
});
