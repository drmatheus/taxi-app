import { AppError } from '../../error';
import googleMapsApi from './googleMapsApi';

type CalculateDistanceReturn = {
  distance: number;
  duration: number;
  origin: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
  routeResponse: any;
};

export const calculateDistance = async (
  origin: string,
  destination: string
): Promise<CalculateDistanceReturn> => {
  try {
    const { data } = await googleMapsApi.get('/directions/json', {
      params: {
        origin,
        destination,
        mode: 'driving',
        language: 'pt-BR',
      },
    });

    if (data.status !== 'OK' || data.routes.length === 0) {
      throw new AppError('INVALID_DATA', 'Destination or origin not found.');
    } else {
      const route = data.routes[0];
      const leg = route.legs[0];

      const distanceText = leg.distance.value;
      const durationValue = leg.duration.value;

      const originLat = leg.start_location.lat;
      const originLng = leg.start_location.lng;

      const destinationLat = leg.end_location.lat;
      const destinationLng = leg.end_location.lng;

      return {
        distance: distanceText,
        duration: durationValue,
        destination: {
          lat: destinationLat,
          lng: destinationLng,
        },
        origin: {
          lat: originLat,
          lng: originLng,
        },
        routeResponse: {
          ...route,
        },
      };
    }
  } catch (error) {
    throw new AppError('INVALID_DATA', 'Destination or origin not found.');
  }
};
