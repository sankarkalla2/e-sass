import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(2, { message: "Email required" }),
  password: z.string().min(4, {
    message: "Password required",
  }),
});
