import { TRideHistory } from '../../types/ride';

const RideHistoryCard = ({
  date,
  origin,
  destination,
  distance,
  duration,
  value,
  driver_id,
  customer_id,
}: TRideHistory) => {
  return (
    <li className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 bg-gray-200 p-4 shadow-lg rounded-md">
      <div className=" md:col-span-2 lg:col-span-3">
        <p className="font-bold">Origem</p>
        <p>{origin}</p>
      </div>

      <div className=" md:col-span-2 lg:col-span-3">
        <p className="font-bold">Destination</p>
        <p>{destination}</p>
      </div>

      <div>
        <p className="font-bold">Data</p>
        <p>
          {new Date(date).toLocaleDateString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      <div>
        <p className="font-bold">Distância</p>
        <p>{(distance / 1000).toFixed(1)} Km</p>
      </div>

      <div>
        <p className="font-bold">Duração</p>
        <p>{duration}</p>
      </div>

      <div>
        <p className="font-bold">Valor</p>
        <p>
          {value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>

      <div>
        <p className="font-bold ">ID Motorista</p>
        <p>{driver_id}</p>
      </div>

      <div>
        <p className="font-bold ">ID Passageiro</p>
        <p>{customer_id}</p>
      </div>
    </li>
  );
};

export default RideHistoryCard;
