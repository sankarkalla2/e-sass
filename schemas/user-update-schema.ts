import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "required",
    })
    .optional(),
  image: z
    .string()
    .min(1, {
      message: "Requred",
    })
    .optional(),
  isTwoFactorEnabled: z.boolean().optional(),
});
