import { z } from 'zod';

const ConfirmRideDTO = z
  .object({
    customer_id: z.string(),
    origin: z.string(),
    destination: z.string(),
    distance: z.number(),
    duration: z.string(),
    driver: z.object({
      id: z.number(),
      name: z.string(),
    }),
    value: z.number(),
  })
  .refine(({ origin, destination }) => origin !== destination, {
    message: 'Origem e destino devem ser diferentes',
    path: ['destination'],
  });

export default ConfirmRideDTO;

export type ConfirmRideDTO = z.infer<typeof ConfirmRideDTO>;
