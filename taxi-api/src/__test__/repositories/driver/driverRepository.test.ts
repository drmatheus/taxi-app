import { prisma } from '../../../database/prismaClient';
import { AppError } from '../../../error';
import { DriverRepository } from '../../../repositories/driver/driver';

jest.mock('../../../database/prismaClient', () => ({
  prisma: {
    driver: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('DriverRepository', () => {
  const driverRepository = new DriverRepository(prisma);

  it('should throw error when driver not found and throwError is true', async () => {
    (prisma.driver.findUnique as jest.Mock).mockResolvedValueOnce(null);

    await expect(driverRepository.getOne(1, true)).rejects.toThrow(AppError);
  });

  it('should return driver when found', async () => {
    const mockDriver = { id: 1, name: 'John Doe' };
    (prisma.driver.findUnique as jest.Mock).mockResolvedValueOnce(mockDriver);

    const driver = await driverRepository.getOne(1);

    expect(driver).toEqual(mockDriver);
  });

  it('should return drivers when getAll is called with filter', async () => {
    const mockDrivers = [
      {
        id: 1,
        name: 'Driver 1',
        fee: 50,
        minDistance: 10,
        review: { comment: 'Good', rating: 5 },
      },
      {
        id: 2,
        name: 'Driver 2',
        fee: 40,
        minDistance: 5,
        review: { comment: 'Excellent', rating: 5 },
      },
    ];
    const filter = { minDistance: 10 };

    (prisma.driver.findMany as jest.Mock).mockResolvedValueOnce(mockDrivers);

    const drivers = await driverRepository.getAll(filter);

    expect(drivers).toEqual(mockDrivers);
    expect(prisma.driver.findMany).toHaveBeenCalledWith({
      where: {
        minDistance: {
          lte: filter.minDistance,
        },
      },
      include: {
        review: {
          select: {
            comment: true,
            rating: true,
          },
        },
      },
      orderBy: {
        fee: 'asc',
      },
    });
  });
});
