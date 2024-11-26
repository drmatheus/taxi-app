import { z } from 'zod';
import { ReviewDTO } from '../review/reviewDTO';

export const driverDTO = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  vehicle: z.string(),
  minDistance: z.number(),
  fee: z.number(),
  review: ReviewDTO.partial().optional().nullable(),
});

export type DriverDTO = z.infer<typeof driverDTO>;
