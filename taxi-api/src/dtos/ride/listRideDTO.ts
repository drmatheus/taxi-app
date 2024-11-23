import { z } from 'zod';

const ListRideDTO = z.object({
  customer_id: z.string(),
  driver_id: z.coerce.number().optional(),
});

export default ListRideDTO;

export type ListRideDTO = z.infer<typeof ListRideDTO>;
