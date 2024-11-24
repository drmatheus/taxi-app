import { useRide } from '../../context/ride';

const NoRideEstimated = () => {
  const { rideOptions, rideEstimatedError } = useRide();

  if (rideOptions?.length) return null;

  return (
    <div className="flex mt-4 shadow-md rounded-lg bg-gray-100 justify-center items-center h-[366px]  ">
      <div className="   p-6 h-fit  w-full text-center">
        <h1 className="text-blue-950 text-2xl font-bold mb-4">
          {rideEstimatedError
            ? 'Erro ao buscar viagens ❌'
            : 'Nenhuma viagem encontrada 🚖'}
        </h1>

        <p className="text-gray-700 text-lg">{rideEstimatedError}</p>

        <p className="text-gray-700 text-lg mt-4">
          {rideEstimatedError
            ? 'Tente novamente'
            : 'Listaremos todos os resultados aqui. 😊'}
        </p>
      </div>
    </div>
  );
};

export default NoRideEstimated;
