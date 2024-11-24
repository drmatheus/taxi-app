import { zodResolver } from '@hookform/resolvers/zod';
import { filterHistorySchema } from '../../schemas/filterHistorySchema';
import { useForm } from 'react-hook-form';
import Input from '../common/input';
import { useRide } from '../../context/ride';
import Button from '../common/button';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const FilterRideHistory = () => {
  const { getRidesHistory } = useRide();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(filterHistorySchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        getRidesHistory(data.customer_id, data.driver_id)
      )}
      className="gap-4 bg-gray-200 overflow-hidden rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold bg-blue-950 py-2 px-4 text-white">
        Filtrar histórico
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 p-4">
        <Input
          type="text"
          label="ID do cliente"
          error={errors.customer_id?.message?.toString()}
          {...register('customer_id')}
        />
        <Input
          type="number"
          label="ID do motorista"
          error={errors.driver_id?.message?.toString()}
          {...register('driver_id')}
        />

        <Button
          icon={FaMagnifyingGlass}
          type="submit"
          text="Filtrar"
          className=" min-w-48 lg:h-[38px] mt-auto sm:col-span-2 lg:col-span-1"
        />
      </div>
    </form>
  );
};

export default FilterRideHistory;
