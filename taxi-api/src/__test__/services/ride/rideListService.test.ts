import rideListService from '../../../services/ride/list';
import { AppError } from '../../../error';
import { DriverRepository } from '../../../repositories/driver/driver';
import { RideRepository } from '../../../repositories/ride/ride';

// Mockando dependências
jest.mock('../../../repositories/driver/driver');
jest.mock('../../../repositories/ride/ride');

const mockRideListData = {
  driver_id: 1,
  customer_id: '123123',
};

describe('rideListService', () => {
  it('should return a list of rides', async () => {
    (DriverRepository.prototype.getOne as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'John Doe',
      vehicle: 'Car model',
      fee: 2.5,
      minDistance: 5,
      rating: { comment: 'Good', rating: 4 },
    });

    (RideRepository.prototype.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        driver_id: 1,
        customer_id: '123123',
        origin: 'Tv. Sao Jose 455 Navegantes, Porto Alegre',
        destination: 'Av. Joao Wallig 1800, Porto Alegre',
        distance: 10000,
        duration: '5 min e 20 seg',
        value: 25,
      },
    ]);

    const result = await rideListService(mockRideListData);

    expect(result).toHaveProperty('customer_id');
    expect(result.customer_id).toBe('123123');

    expect(result).toHaveProperty('rides');
    expect(result.rides.length).toBe(1);
  });

  it('should throw an error if driver_id is not a number', async () => {
    (DriverRepository.prototype.getOne as jest.Mock).mockResolvedValue(null);

    await expect(rideListService(mockRideListData)).rejects.toThrow(AppError);
  });

  it('should throw an error if no rides are found', async () => {
    (RideRepository.prototype.getAll as jest.Mock).mockResolvedValue([]);

    await expect(rideListService({ customer_id: '123123' })).rejects.toThrow(
      AppError
    );
  });
});
