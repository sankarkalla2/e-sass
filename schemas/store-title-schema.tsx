"use client";

import { z } from "zod";

export const storeTitleSchema = z.object({
  name: z.string().min(2, {
    message: "Title required",
  }),
});
