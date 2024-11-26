import { z } from 'zod';

export const ReviewDTO = z.object({
  id: z.number(),
  driver_id: z.number(),
  comment: z.string(),
  rating: z.number(),
});

export type ReviewDTO = z.infer<typeof ReviewDTO>;
