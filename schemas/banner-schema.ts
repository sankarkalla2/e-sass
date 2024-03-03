import { z } from "zod";

export const bannerSchema = z.object({
  name: z.string().min(1, {
    message: "Banner Title required",
  }),
  categoryId: z.string(),
  offer: z.coerce.number().min(1).max(100).optional(),
});
