import { prisma } from '../../database/prismaClient';
import { CreateRideDTO } from '../../dtos/ride/createRideDTO';
import { RideDTO } from '../../dtos/ride/rideDTO';
import IRideRepository, { RideFilter, RideOrderBy } from './iRide';

export class RideRepository implements IRideRepository {
  async create(data: CreateRideDTO): Promise<RideDTO> {
    return await prisma.ride.create({
      data: {
        date: new Date(),
        ...data,
      },
    });
  }

  async getOne(id: number): Promise<RideDTO | null> {
    return await prisma.ride.findUnique({
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

  async getAll(filter: RideFilter, orderBy?: RideOrderBy): Promise<RideDTO[]> {
    const { field = 'date', order = 'desc' } = orderBy || {};

    return await prisma.ride.findMany({
      where: {
        customer_id: filter?.customer_id,
        driver_id: filter?.driver_id,
      },
      orderBy: orderBy ? { [field]: order } : undefined,
    });
  }
}
