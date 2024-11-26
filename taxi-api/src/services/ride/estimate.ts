import { EstimateRideDTO } from '../../dtos/ride/estimateRideDTO';
import { AppError } from '../../error';
import { calculateDistance } from '../../integrations/googleMaps';
import { driverRepositoryInstance } from '../../repositories/driver/driver';

const rideEstimateService = async (data: EstimateRideDTO) => {
  const travelInfo = await calculateDistance(data.origin, data.destination);

  //Apesar de ja ser verificado o payload, é possivel que a descrição dos dois endereços resumam o mesmo local
  if (
    travelInfo.origin.lat === travelInfo.destination.lat &&
    travelInfo.origin.lng === travelInfo.destination.lng
  ) {
    throw new AppError('INVALID_DATA', 'Origem e destino devem ser diferentes');
  }

  const distance = travelInfo.distance / 1000;
  const duration = `${Math.floor(travelInfo.duration / 60)} min e ${
    travelInfo.duration % 60
  } seg`;

  const availableDrivers = await driverRepositoryInstance.getAll({
    minDistance: distance,
  });

  const options = availableDrivers.map(({ minDistance, fee, ...driver }) => ({
    ...driver,
    value: Number((distance * fee).toFixed(2)),
  }));

  return {
    origin: travelInfo.origin,
    destination: travelInfo.destination,
    distance,
    duration,
    options,
    routeResponse: travelInfo.routeResponse,
  };
};

export default rideEstimateService;
