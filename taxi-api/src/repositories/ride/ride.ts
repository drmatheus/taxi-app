import { PrismaClient } from '@prisma/client';
import { prisma } from '../../database/prismaClient';
import { CreateRideDTO } from '../../dtos/ride/createRideDTO';
import { RideDTO } from '../../dtos/ride/rideDTO';
import IRideRepository, { RideFilter, RideOrderBy } from './iRide';

export class RideRepository implements IRideRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateRideDTO): Promise<RideDTO> {
    return await this.prisma.ride.create({
      data: {
        date: new Date(),
        ...data,
      },
    });
  }

  async getOne(id: number): Promise<RideDTO | null> {
    return await this.prisma.ride.findUnique({
      where: {
        id,
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getAll(
    filter: RideFilter,
    orderBy?: RideOrderBy
  ): Promise<Omit<RideDTO, 'driver_id'>[]> {
    const { field = 'date', order = 'desc' } = orderBy || {};

    return await this.prisma.ride.findMany({
      where: {
        customer_id: filter?.customer_id,
        driver_id: filter?.driver_id,
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

      orderBy: orderBy ? { [field]: order } : undefined,
    });
  }
}

export const rideRepositoryInstance = new RideRepository(prisma);
