import { z } from 'zod';

const CreateRideDTO = z.object({
  customer_id: z.string(),
  origin: z.string(),
  destination: z.string(),
  distance: z.number(),
  duration: z.string(),
  driver_id: z.number(),
  value: z.number(),
});

export default CreateRideDTO;

export type CreateRideDTO = z.infer<typeof CreateRideDTO>;
