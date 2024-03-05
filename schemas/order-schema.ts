import { z } from "zod";

export const orderSchema = z.object({
  orderId: z.string(),
  storeId: z.string(),
  isPaid: z.coerce.boolean(),
  phone: z.string(),
  address: z.string(),
  totalPrice: z.coerce.number(),
});
