import { ListRideDTO } from '../../dtos/ride/listRideDTO';
import { AppError } from '../../error';
import { driverRepositoryInstance } from '../../repositories/driver/driver';
import { rideRepositoryInstance } from '../../repositories/ride/ride';

const rideListService = async (data: ListRideDTO) => {
  if (data.driver_id) {
    const driver = await driverRepositoryInstance.getOne(
      Number(data.driver_id)
    );

    if (!driver) {
      throw new AppError('INVALID_DRIVER', 'Id de motorista inválido', 400);
    }
  }
  const rides = await rideRepositoryInstance.getAll(data, {
    field: 'date',
    order: 'desc',
  });

  if (rides.length === 0) {
    throw new AppError('NO_RIDES_FOUND', 'Nenhuma corrida encontrada', 404);
  }

  return {
    customer_id: data.customer_id,
    rides,
  };
};

export default rideListService;
