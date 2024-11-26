import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../service/api';
import { EstimateRideSchema } from '../schemas/rideEstimateSchema';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  TRideEstimated,
  TRideOption,
  TRideOptions,
  TRideHistoryResponse,
} from '../types/ride';

// Criação do contexto
const RideContext = createContext<{
  handleRideEstimate: (data: EstimateRideSchema) => void;
  getRidesHistory: (customerId: string, driverId?: string) => void;
  rides: TRideHistoryResponse | null;
  rideEstimated: TRideEstimated | null;
  rideOptions: TRideOptions | null;
  handleConfirmRide: (rideOption: TRideOption) => void;
  rideEstimatedError: string | null;
} | null>(null);

// Provider do contexto
export const RideProvider = ({ children }: { children: React.ReactNode }) => {
  const [rides, setRides] = useState<TRideHistoryResponse | null>(null);
  const [rideEstimated, setRideEstimated] = useState<TRideEstimated | null>(
    null
  );
  const [rideOptions, setRideOptions] = useState([]);
  const [customer_id, setCustomer_id] = useState<string>();
  const [rideEstimatedError, setRideEstimatedError] = useState<string | null>(
    null
  );

  const location = useLocation();
  const navigate = useNavigate();

  const handleRideEstimate = useCallback(async (data: EstimateRideSchema) => {
    try {
      const { data: rideOptionsResponse } = await api.post(
        '/ride/estimate',
        data
      );
      setCustomer_id(data.customer_id);
      setRideOptions(rideOptionsResponse.options);
      setRideEstimated(rideOptionsResponse);

      setRideEstimatedError(null);
      if (location.pathname !== '/new-ride') {
        navigate('/new-ride');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setRideEstimatedError(error.response?.data.error_description);
        toast.error(
          error.response?.data.error_code +
            '\n' +
            error.response?.data.error_description
        );
      } else {
        setRideEstimatedError(
          'Ocorreu um erro ao fazer a consulta da viagem, tente novamente.'
        );
        toast.error('Ocorreu um erro ao fazer a consulta da viagem');
      }
    }
  }, []);

  const getRidesHistory = useCallback(
    async (customerId: string, driverId?: string) => {
      try {
        const { data: ridesResponse } = await api.get(`/ride/${customerId}`, {
          params: {
            driver_id: driverId,
          },
        });
        setRides(ridesResponse);
      } catch (error) {
        setRides(null);
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data.error_code +
              '\n' +
              error.response?.data.error_description
          );
        }
      }
    },
    []
  );

  const handleConfirmRide = useCallback(
    async (rideOption: TRideOption) => {
      if (!rideEstimated) return;
      try {
        await api.patch(`/ride/confirm`, {
          customer_id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          origin: (rideEstimated as any).routeResponse.routes[0].legs[0]
            .start_address,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          destination: (rideEstimated as any).routeResponse.routes[0].legs[0]
            .end_address,
          distance: rideEstimated.distance * 1000,
          duration: rideEstimated.duration,
          vehicle: rideOption.vehicle,
          driver: {
            id: rideOption.id,
            name: rideOption.name,
          },
          value: rideOption.value,
        });
        toast.success('Viagem confirmada com sucesso!');
        setRideEstimated(null);
        setRideOptions([]);
        if (customer_id) getRidesHistory(customer_id);
        navigate('/history');
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data.error_code +
              '\n' +
              error.response?.data.error_description
          );
        }
      }
    },
    [customer_id, rideEstimated]
  );

  return (
    <RideContext.Provider
      value={{
        handleRideEstimate,
        getRidesHistory,
        rides,
        rideOptions,
        rideEstimated,
        handleConfirmRide,
        rideEstimatedError,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useRide = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRide deve ser usado dentro de um RideProvider');
  }
  return context;
};
