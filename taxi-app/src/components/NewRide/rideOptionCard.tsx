import { useRide } from '../../context/ride';
import { TRideOption } from '../../types/ride';
import Button from '../common/button';
import Stars from './stars';

const RideOptionCard = (option: TRideOption) => {
  const {
    description,
    name,
    value,
    vehicle,
    review: { rating, comment },
  } = option;

  const { handleConfirmRide } = useRide();

  return (
    <li className="p-4 border rounded-md w-full shadow-md bg-gray-100/80">
      <h2 className="text-lg font-semibold mb-2">{name}</h2>

      <div className="my-2">
        <p className="text-sm">Descrição:</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div>
        <p className="text-sm">Carro:</p>
        <p className="text-sm text-gray-500">{vehicle}</p>
      </div>

      <div className=" bg-gray-200/20 rounded-md border-gray-200 overflow-hidden border my-4">
        <p className=" text-sm px-4 py-2 font-semibold text-white bg-yellow-600">
          Review:
        </p>
        <div className="px-4 py-2">
          <div>
            <p className="text-sm">Nota:</p>
            <Stars stars={rating} />
          </div>
          <div>
            <p className="text-sm">Comentário:</p>
            <p className="text-sm text-gray-500 italic ">{comment}</p>
          </div>
        </div>
      </div>

      <div className="flex  items-center justify-between ">
        <p className="flex text-blue-950 font-medium">
          Total:{' '}
          {value.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          })}
        </p>
        <Button
          text="Selecionar"
          onClick={() => {
            handleConfirmRide(option);
          }}
          className="h-8 px-8"
        />
      </div>
    </li>
  );
};

export default RideOptionCard;
