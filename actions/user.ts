"use server";
import { getUserById } from "@/data/user-service";
import db from "@/lib/db";
import { updateUserSchema } from "@/schemas/user-update-schema";
import { z } from "zod";

export const updateUser = async (
  values: z.infer<typeof updateUserSchema>,
  userId: string
) => {


  console.log(values);
  
  try {
    const validatedFields = updateUserSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "invalid inputs" };
    }
    const data = validatedFields.data;
    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return { error: "User not found" };
    }
    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        ...data,
      },
    });

    return { success: "User Values updated successfully" };
  } catch (err) {
    console.log("Error", err);
    return { error: "Internel server error" };
  }
};
// isTwoFactorEnabled
