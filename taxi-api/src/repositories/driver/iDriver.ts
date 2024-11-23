import { DriverDTO } from '../../dtos/driver/driverDTO';

export type DriverFilter = {
  minDistance?: number;
};

interface IDriverRepository {
  getAll(filter?: DriverFilter): Promise<DriverDTO[]>;
  getOne<T extends boolean = false>(
    id: number,
    throwError?: T
  ): Promise<T extends true ? DriverDTO : DriverDTO | null>;
}

export default IDriverRepository;
