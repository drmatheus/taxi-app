import { PrismaClient } from '@prisma/client';
import { prisma } from '../../database/prismaClient';
import { DriverDTO } from '../../dtos/driver/driverDTO';
import { AppError } from '../../error';
import IDriverRepository, { DriverFilter } from './iDriver';

export class DriverRepository implements IDriverRepository {
  constructor(private prisma: PrismaClient) {}
  async getAll(filter: DriverFilter): Promise<DriverDTO[]> {
    return await prisma.driver.findMany({
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
      throw new AppError('DRIVER_NOT_FOUND', 'Motorista não encontrado', 404);
    }

    return driver as T extends true ? DriverDTO : DriverDTO | null;
  }
}

export const driverRepositoryInstance = new DriverRepository(prisma);
