import { ListRideDTO } from '../../dtos/ride/listRideDTO';
import { AppError } from '../../error';
import { RideRepository } from '../../repositories/ride/ride';

const rideListService = async (data: ListRideDTO) => {
  const rides = await new RideRepository().getAll(data);

  if (rides.length === 0) {
    throw new AppError('NO_RIDES_FOUND', 'No rides found.', 404);
  }

  return {
    customer_id: data.customer_id,
    rides,
  };
};

export default rideListService;
