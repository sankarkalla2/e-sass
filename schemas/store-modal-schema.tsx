import { z } from "zod";

export const storeModalSchema = z.object({
  name: z.string().min(2, {
    message: "store name is required",
  }),
});
