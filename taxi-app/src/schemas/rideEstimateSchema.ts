import { z } from 'zod';

export const estimateRideFormSchema = z
  .object({
    customer_id: z
      .string()
      .min(1, { message: 'O id do cliente é obrigatorio' }),
    origin: z.string().min(1, { message: 'A origem é obrigatorio' }),
    destination: z.string().min(1, { message: 'O destino é obrigatorio' }),
  })
  .refine((data) => data.origin !== data.destination, {
    message: 'Origem e destino devem ser diferentes',
    path: ['destination'],
  });

export type EstimateRideSchema = z.infer<typeof estimateRideFormSchema>;
