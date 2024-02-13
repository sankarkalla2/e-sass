import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4, {
    message: "Name required",
  }),
  email: z.string().email().min(6, {
    message: "Email required",
  }),
  password: z.string().min(4, {
    message: "Password required",
  }),
});
