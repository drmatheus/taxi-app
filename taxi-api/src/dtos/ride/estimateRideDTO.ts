import { z } from 'zod';

const EstimateRideDTO = z.object({
  customer_id: z.string(),
  origin: z.string(),
  destination: z.string(),
});

export default EstimateRideDTO;

export type EstimateRideDTO = z.infer<typeof EstimateRideDTO>;
