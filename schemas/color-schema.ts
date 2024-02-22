import { z } from "zod";

export const colorSchema = z.object({
  name: z.string().min(1, {
    message: "name required",
  }),
  value: z.string().min(1, {
    message: "value is required",
  }),
});
