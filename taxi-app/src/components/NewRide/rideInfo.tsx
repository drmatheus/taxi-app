import { useRide } from '../../context/ride';

const RideInfo = () => {
  const { rideEstimated } = useRide();

  if (!rideEstimated) return null;

  return (
    <div className="grid grid-cols-1 mb-4 rounded-lg sm:grid-cols-2 bg-blue-950 p-4 text-white">
      <div>
        <p>Duração estimada:</p>
        <p>{rideEstimated.duration}</p>
      </div>

      <div>
        <p>Distancia aproximada:</p>
        <p>{rideEstimated.distance.toFixed(1)} Km</p>
      </div>
    </div>
  );
};

export default RideInfo;
