"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { CategorySchema } from "@/schemas/category-schema";
import { z } from "zod";

export const createNewCategory = async (
  values: z.infer<typeof CategorySchema>,
  storeId: string
) => {
  const user = await auth();
  if (!user || !user.id) {
    return { error: "You are not authenticated" };
  }

  const validatedFields = CategorySchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: "Invalid input",
    };

  const { name, billboard } = validatedFields.data;
  try {
    const category = await db.category.create({
      data: {
        name,
        billboardId: billboard,
        storeId,
      },
    });

    return { success: "new category created successfully" };
  } catch {
    return { error: "something went wrong" };
  }
};
