"use server";

import { storeModalSchema } from "@/schemas/store-modal-schema";
import { z } from "zod";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
export const createStore = async (values: z.infer<typeof storeModalSchema>) => {
  try {
    const user = await auth();
    if (!user)
      return {
        error: "you are unaurized",
      };

    const { id } = user;
    if (!id) return { error: "You are unaurized" };

    const store = await db.store.create({
      data: {
        name: values.name,
        userId: id,
      },
    });

    return {
      success: store,
    };
  } catch {
    return { error: "Internel server error" };
  }
};
