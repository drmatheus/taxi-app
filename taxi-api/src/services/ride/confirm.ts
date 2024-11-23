import { DriverDTO } from '../../dtos/driver/driverDTO';
import { ConfirmRideDTO } from '../../dtos/ride/confirmRideDTO';
import { AppError } from '../../error';
import { DriverRepository } from '../../repositories/driver/driver';
import { RideRepository } from '../../repositories/ride/ride';

const rideConfirmService = async ({
  driver: { id: driverId },
  ...data
}: ConfirmRideDTO) => {
  const driver: DriverDTO = await new DriverRepository().getOne(driverId, true);

  const distanceIsValid = driver.minDistance <= data.distance / 1000;

  if (!distanceIsValid) {
    const error_description = `The minimum ride distance for this driver is ${
      driver.minDistance
    } km and your ride distance is ${(data.distance / 1000).toFixed(1)} km.`;
    throw new AppError('INVALID_DISTANCE', error_description, 406);
  }

  await new RideRepository().create({
    ...data,
    driver_id: driver.id,
  });

  return { success: true };
};

export default rideConfirmService;
