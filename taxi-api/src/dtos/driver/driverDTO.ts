import { z } from 'zod';
import { ratingDTO } from '../rating/ratingDTO';

export const driverDTO = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  vehicle: z.string(),
  minDistance: z.number(),
  fee: z.number(),
  rating: ratingDTO.partial().optional().nullable(),
});

export type DriverDTO = z.infer<typeof driverDTO>;
