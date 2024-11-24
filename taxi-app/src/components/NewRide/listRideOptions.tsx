import { useRide } from '../../context/ride';
import { TRideOption } from '../../types/ride';
import RideOptionCard from './rideOptionCard';

const ListRideOptions = () => {
  const { rideOptions } = useRide();

  return (
    <ul className="flex flex-col gap-4">
      {rideOptions ? (
        rideOptions.map((rideOption: TRideOption) => (
          <RideOptionCard key={rideOption.id} {...rideOption} />
        ))
      ) : (
        <li>
          <p>Não há opções de viagem disponíveis :( </p>
        </li>
      )}
    </ul>
  );
};

export default ListRideOptions;
