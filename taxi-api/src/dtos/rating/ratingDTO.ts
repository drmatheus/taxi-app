import { z } from 'zod';

export const ratingDTO = z.object({
  id: z.number(),
  driver_id: z.number(),
  comment: z.string(),
  rating: z.number(),
});

export type RatingDTO = z.infer<typeof ratingDTO>;
