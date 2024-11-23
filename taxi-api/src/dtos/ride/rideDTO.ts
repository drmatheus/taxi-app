import { z } from 'zod';
import { driverDTO } from '../driver/driverDTO';
import { customerDTO } from '../customer/customerDTO';

const RideDTO = z.object({
  id: z.number(),
  date: z.date(),
  origin: z.string(),
  destination: z.string(),
  distance: z.number(),
  duration: z.string(),
  value: z.number(),
  driver_id: z.number(),
  customer_id: z.string(),
  driver: driverDTO.partial().optional(),
  customer: customerDTO.optional(),
});

export default RideDTO;

export type RideDTO = z.infer<typeof RideDTO>;
