import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, {
    message: "category name required",
  }),
  billboard: z.string(),
});
