import { z } from "zod";

export const billBoardSchema = z.object({
  label: z.string().min(2, {
    message: "Label required",
  }),
  imgUrl: z.string().min(2, {
    message: "imgUrl required",
  }),
});
