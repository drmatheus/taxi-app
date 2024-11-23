import { CreateRideDTO } from '../../dtos/ride/createRideDTO';
import { RideDTO } from '../../dtos/ride/rideDTO';

export type RideFilter = {
  customer_id?: string;
  driver_id?: number;
};

export type RideOrderBy = {
  field: 'date' | 'duration' | 'distance' | 'value';
  order: 'asc' | 'desc';
};

interface IRideRepository {
  create(data: CreateRideDTO): Promise<RideDTO>;
  getAll(filter?: RideFilter, orderBy?: RideOrderBy): Promise<RideDTO[]>;
  getOne(id: number): Promise<RideDTO | null>;
}

export default IRideRepository;
