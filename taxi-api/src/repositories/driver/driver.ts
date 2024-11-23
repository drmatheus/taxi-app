import { prisma } from '../../database/prismaClient';
import { DriverDTO } from '../../dtos/driver/driverDTO';
import { AppError } from '../../error';
import IDriverRepository, { DriverFilter } from './iDriver';

export class DriverRepository implements IDriverRepository {
  async getAll(filter: DriverFilter): Promise<DriverDTO[]> {
    return await prisma.driver.findMany({
      where: {
        minDistance: {
          lte: filter.minDistance,
        },
      },
      include: {
        rating: {
          select: {
            comment: true,
            rating: true,
          },
        },
      },
    });
  }

  async getOne<T extends boolean = false>(
    id: number,
    throwError?: T
  ): Promise<T extends true ? DriverDTO : DriverDTO | null> {
    const driver = await prisma.driver.findUnique({
      where: {
        id,
      },
    });

    if (!driver && throwError) {
      throw new AppError('DRIVER_NOT_FOUND', 'Driver not found.', 404);
    }

    return driver as T extends true ? DriverDTO : DriverDTO | null;
  }
}
