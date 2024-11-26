export type TRideEstimated = {
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      comment: string;
      rating: number;
    };
    value: number;
  }[];
  routeResponse: unknown;
};

export type TRideOptions = TRideEstimated['options'];

export type TRideOption = TRideOptions[0];

export type TRideHistoryResponse = {
  customer_id: string;
  rides: {
    id: number;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    driver: {
      id: number;
      name: string;
    };
    customer_id: string;
  }[];
};

export type TRideHistories = TRideHistoryResponse['rides'];

export type TRideHistory = TRideHistories[0];
