import { Decimal } from "@prisma/client/runtime/library";
import { ZodAny, z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  price: z.coerce.number().min(1),
  size: z.string(),
  color: z.string(),
  category: z.string(),
  images: z.object({ url: z.string() }).array(),
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
});
