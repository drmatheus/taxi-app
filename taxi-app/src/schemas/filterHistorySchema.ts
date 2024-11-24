import { z } from 'zod';

export const filterHistorySchema = z.object({
  customer_id: z
    .string({ required_error: 'O id do cliente é obrigatorio' })
    .min(1, { message: 'O id do cliente é obrigatorio' }),
  driver_id: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.coerce
      .number({ invalid_type_error: 'O id do motorista deve ser um numero' })
      .optional()
  ),
});

export type FilterHistorySchema = z.infer<typeof filterHistorySchema>;
