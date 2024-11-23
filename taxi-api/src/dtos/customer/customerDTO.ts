import { z } from 'zod';

export const customerDTO = z.object({
  id: z.number(),
  name: z.string(),
});

export type CustomerDTO = z.infer<typeof customerDTO>;
