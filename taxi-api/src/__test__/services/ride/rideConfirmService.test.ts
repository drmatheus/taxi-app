import rideConfirmService from '../../../services/ride/confirm';
import { AppError } from '../../../error';
import { DriverRepository } from '../../../repositories/driver/driver';
import { RideRepository } from '../../../repositories/ride/ride';

jest.mock('../../../repositories/driver/driver');
jest.mock('../../../repositories/ride/ride');

const mockRideConfirmData = {
  driver: { id: 1, name: 'John Doe' },
  distance: 10000,
  duration: '5 min e 20 seg',
  origin: 'Tv. Sao Jose 455 Navegantes, Porto Alegre',
  destination: 'Av. Joao Wallig 1800, Porto Alegre',
  customer_id: '123123',
  value: 25,
};

describe('rideConfirmService', () => {
  //Testa sucesso com dados mockados
  it('should confirm a ride', async () => {
    (DriverRepository.prototype.getOne as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'John Doe',
      vehicle: 'Car model',
      fee: 2.5,
      minDistance: 5,
      review: { comment: 'Good', rating: 4 },
    });

    (RideRepository.prototype.create as jest.Mock).mockResolvedValue(
      mockRideConfirmData
    );

    const result = await rideConfirmService(mockRideConfirmData);

    expect(result).toHaveProperty('success');
    expect(result.success).toBe(true);
  });

  //Testa erro de distancia invalida
  it('should throw an error if distance is invalid', async () => {
    mockRideConfirmData.distance = 4000;

    (DriverRepository.prototype.getOne as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'John Doe',
      vehicle: 'Car model',
      fee: 2.5,
      minDistance: 5,
      review: { comment: 'Good', rating: 4 },
    });

    await expect(rideConfirmService(mockRideConfirmData)).rejects.toThrow(
      AppError
    );
  });
});
