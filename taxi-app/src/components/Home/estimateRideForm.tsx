import { useForm } from 'react-hook-form';
import Input from '../common/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRide } from '../../context/ride';
import Button from '../common/button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import {
  estimateRideFormSchema,
  EstimateRideSchema,
} from '../../schemas/rideEstimateSchema';
import { useEffect } from 'react';

const EstimateRideForm = () => {
  const { handleRideEstimate, rideEstimated } = useRide();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EstimateRideSchema>({
    mode: 'onBlur',
    resolver: zodResolver(estimateRideFormSchema),
  });

  useEffect(() => {
    if (rideEstimated) {
      setValue(
        'destination',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (rideEstimated as any).routeResponse.legs[0].end_address
      );
      setValue(
        'origin',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (rideEstimated as any).routeResponse.legs[0].start_address
      );
    }
  }, [rideEstimated]);

  return (
    <div className="shadow-lg overflow-hidden rounded-lg bg-gray-100/60">
      <h2 className="text-xl text-white bg-blue-950 py-2 px-4 font-semibold">
        Consultar viagem
      </h2>

      <form
        className=" flex flex-col gap-4 p-4 "
        onSubmit={handleSubmit(handleRideEstimate)}
      >
        <Input
          {...register('customer_id')}
          type="text"
          label="ID do cliente"
          placeholder="ID do cliente"
          error={errors.customer_id?.message?.toString()}
        />

        <Input
          {...register('origin')}
          type="text"
          label="Endereço de origem"
          placeholder="Rua, número, bairro, cidade"
          error={errors.origin?.message?.toString()}
        />

        <Input
          {...register('destination')}
          type="text"
          label="Endereço de destino"
          placeholder="Rua, número, bairro, cidade"
          error={errors.destination?.message?.toString()}
        />

        <Button
          text="Buscar"
          type="submit"
          icon={FaMagnifyingGlass}
          className="mt-2"
        />
      </form>
    </div>
  );
};

export default EstimateRideForm;
