import { EstimateRideDTO } from '../../dtos/ride/estimateRideDTO';
import { calculateDistance } from '../../integrations/googleMaps';
import { DriverRepository } from '../../repositories/driver/driver';

const rideEstimateService = async (data: EstimateRideDTO) => {
  const travelInfo = await calculateDistance(data.origin, data.destination);

  const distance = travelInfo.distance / 1000;
  const duration = `${Math.floor(travelInfo.duration / 60)} min e ${
    travelInfo.duration % 60
  } seg`;

  const availableDrivers = await new DriverRepository().getAll({
    minDistance: distance,
  });

  const options = availableDrivers.map(({ minDistance, fee, ...driver }) => ({
    ...driver,
    value: Number((distance * fee).toFixed(2)),
  }));

  return {
    origin: data.origin,
    destination: data.destination,
    distance,
    duration,
    options,
    routeResponse: travelInfo.routeResponse,
  };
};

export default rideEstimateService;
