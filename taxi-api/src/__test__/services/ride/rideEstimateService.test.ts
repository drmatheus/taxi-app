import rideEstimateService from '../../../services/ride/estimate';
import { AppError } from '../../../error';
import { DriverRepository } from '../../../repositories/driver/driver';
import { calculateDistance } from '../../../integrations/googleMaps';

// Mockando dependências
jest.mock('../../../repositories/driver/driver');
jest.mock('../../../integrations/googleMaps');

const mockRideData = {
  customer_id: '123123',
  origin: 'Tv. São José 455 Navegantes, Porto Alegre',
  destination: 'Av. João Wallig 1800 Porto Alegre',
};

describe('rideEstimateService', () => {
  //Testa sucesso com dados mockados
  it('should calculate the estimated ride details', async () => {
    (calculateDistance as jest.Mock).mockResolvedValue({
      origin: { lat: 12.9716, lng: 77.5946 },
      destination: { lat: 12.2958, lng: 76.6394 },
      distance: 11000,
      duration: 1800,
      routeResponse: {},
    });

    (DriverRepository.prototype.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        name: 'John Doe',
        vehicle: 'Car model',
        fee: 2.5,
        minDistance: 5,
        review: { comment: 'Good', rating: 4 },
      },
      {
        id: 2,
        name: 'Jane Smith',
        vehicle: 'SUV',
        fee: 3.0,
        minDistance: 10,
        review: { comment: 'Excellent', rating: 5 },
      },
    ]);

    const result = await rideEstimateService(mockRideData);

    expect(result).toHaveProperty('distance');
    expect(result).toHaveProperty('duration');
    expect(result).toHaveProperty('origin');
    expect(result).toHaveProperty('destination');

    expect(result.options).toHaveLength(2);
    expect(result.options[0]).toHaveProperty('value');

    expect(result.options[0]).toHaveProperty('id');
    expect(result.options[0]).toHaveProperty('name');
    expect(result.options[0]).toHaveProperty('vehicle');
    expect(result.options[0]).toHaveProperty('vehicle');
    expect(result.options[0]).toHaveProperty('value');
    expect(result.options[0].value).toEqual((2.5 * 11000) / 1000);
    expect(result.options[0]).toHaveProperty('review');
    expect(result.options[0].review).toHaveProperty('comment');
    expect(result.options[0].review).toHaveProperty('rating');
  });

  // Testa erro de origem e destino iguais
  it('should throw an error if origin and destination are the same', async () => {
    const mockRideDataFail = {
      customer_id: '123123',
      origin: 'Porto Alegre',
      destination: 'Porto Alegre',
    };

    (calculateDistance as jest.Mock).mockResolvedValue({
      origin: { lat: 12.9716, lng: 77.5946 },
      destination: { lat: 12.9716, lng: 77.5946 },
      distance: 5000,
      duration: 1200,
      routeResponse: {},
    });

    await expect(rideEstimateService(mockRideDataFail)).rejects.toThrow(
      AppError
    );
  });
});
