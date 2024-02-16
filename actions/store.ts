"use server";

import { storeModalSchema } from "@/schemas/store-modal-schema";
import { z } from "zod";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { storeTitleSchema } from "@/schemas/store-title-schema";
import { getStoreById } from "@/data/store-service";

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

export const updateStore = async (
  values: z.infer<typeof storeTitleSchema>,
  id: string
) => {
  try {
    const user = await auth();
    if (!user || !user.id) {
      return { error: "You are unauthrized" };
    }

    const existingStore = await getStoreById(id);
    if (!existingStore) return { error: "Store not found" };

    await db.store.update({
      where: {
        id: existingStore.id,
        userId: user.id,
      },
      data: {
        ...values,
      },
    });

    return {
      success: "store updated successfully",
    };
  } catch {
    return { error: "Internel server  error" };
  }
};

export const deleteStore = async (id: string) => {
  try {
    const user = await auth();
    if (!user || !user.id) {
      return { error: "You are unauthrized" };
    }

    const existingStore = await getStoreById(id);
    if (!existingStore)
      return {
        error: "Store not found",
      };

    const store = await db.store.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    return { success: "Selected store deleted successfully" };
  } catch {
    return { error: "Internel server error" };
  }
};
