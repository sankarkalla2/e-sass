"use server";

import { getSizeById } from "@/data/size";
import { getStoreById } from "@/data/store-service";
import db from "@/lib/db";
import { sizeSchema } from "@/schemas/size-schema";
import { z } from "zod";

export const createSize = async (
  values: z.infer<typeof sizeSchema>,
  storeId: string
) => {
  const validatedFields = sizeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid input" };
  }

  const { name, value } = validatedFields.data;

  const existingStore = await getStoreById(storeId);
  if (!existingStore) {
    return {
      error: "Store not found",
    };
  }
  try {
    await db.sizes.create({
      data: {
        name,
        value,
        storeId: existingStore.id,
      },
    });

    return { success: "ne" };
  } catch {
    return { error: "Internel Server error" };
  }
};

export const updateSize = async (
  values: z.infer<typeof sizeSchema>,
  storeId: string,
  id: string
) => {
  try {
    const validatedFields = sizeSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid input" };
    }

    const { name, value } = validatedFields.data;
    const existingStore = await getStoreById(storeId);
    if (!existingStore) {
      return { error: "Store not found" };
    }

    const existingSize = await getSizeById(id);
    if (!existingSize) {
      return { error: "Given Size not found" };
    }

    await db.sizes.update({
      where: {
        id: existingSize.id,
      },
      data: {
        name,
        value,
        storeId: existingStore.id,
      },
    });

    return { success: "size is updated" };
  } catch {
    return { error: "Internel server error" };
  }
};

export const deleteSize = async (id: string) => {
  try {
    const existingSize = await getSizeById(id);
    if (!existingSize) {
      return { error: "existing size not found" };
    }

    const size = await db.sizes.delete({
      where: {
        id: existingSize.id,
      },
    });

    return { success: "Existing size deleted successfully" };
  } catch {
    return { error: "Internel server error" };
  }
};
