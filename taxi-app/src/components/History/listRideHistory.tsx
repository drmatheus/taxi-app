import { useRide } from '../../context/ride';
import { TRideHistory } from '../../types/ride';
import NoHistory from './noHistory';
import RideHistoryCard from './rideHistoryCard';

const ListRideHistory = () => {
  const { rides } = useRide();

  if (!rides) {
    return <NoHistory />;
  }

  return (
    <ul className="flex flex-col gap-6 p-4 shadow-xl bg-gray-50  rounded-lg mt-4">
      {rides.rides.map((ride: TRideHistory) => (
        <RideHistoryCard key={ride.id} {...ride} />
      ))}
    </ul>
  );
};

export default ListRideHistory;
