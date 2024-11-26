import { DriverDTO } from '../../dtos/driver/driverDTO';
import { ConfirmRideDTO } from '../../dtos/ride/confirmRideDTO';
import { AppError } from '../../error';
import { driverRepositoryInstance } from '../../repositories/driver/driver';
import { rideRepositoryInstance } from '../../repositories/ride/ride';

const rideConfirmService = async ({
  driver: { id: driverId },
  ...data
}: ConfirmRideDTO) => {
  const driver: DriverDTO = await driverRepositoryInstance.getOne(
    driverId,
    true
  );

  const distanceIsValid = driver.minDistance <= data.distance / 1000;

  if (!distanceIsValid) {
    const error_description = `A distancia minima para realizar uma corrida é ${
      driver.minDistance
    } km e a distancia informada foi ${(data.distance / 1000).toFixed(1)} km.`;
    throw new AppError('INVALID_DISTANCE', error_description, 406);
  }

  rideRepositoryInstance.create({
    ...data,
    driver_id: driver.id,
  });

  return { success: true };
};

export default rideConfirmService;
