"use server";

import { getColorById } from "@/data/color";
import { getStoreById } from "@/data/store-service";
import db from "@/lib/db";
import { colorSchema } from "@/schemas/color-schema";
import { z } from "zod";

export const createColor = async (
  values: z.infer<typeof colorSchema>,
  storeId: string
) => {
  const validatedFields = colorSchema.safeParse(values);
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
    await db.color.create({
      data: {
        name,
        value,
        storeId: existingStore.id,
      },
    });

    return { success: "new color created  successfully" };
  } catch {
    return { error: "Internel Server error" };
  }
};

export const updatecolor = async (
  values: z.infer<typeof colorSchema>,
  storeId: string,
  id: string
) => {
  try {
    const validatedFields = colorSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid input" };
    }

    const { name, value } = validatedFields.data;
    const existingStore = await getStoreById(storeId);
    if (!existingStore) {
      return { error: "Store not found" };
    }

    const existingcolor = await getColorById(id);
    if (!existingcolor) {
      return { error: "Given color not found" };
    }

    await db.color.update({
      where: {
        id: existingcolor.id,
      },
      data: {
        name,
        value,
        storeId: existingStore.id,
      },
    });

    return { success: "color is updated" };
  } catch {
    return { error: "Internel server error" };
  }
};

export const deletecolor = async (id: string) => {
  try {
    const existingcolor = await getColorById(id);
    if (!existingcolor) {
      return { error: "existing color not found" };
    }

    const color = await db.color.delete({
      where: {
        id: existingcolor.id,
      },
    });

    return { success: "Existing color deleted successfully" };
  } catch {
    return { error: "Internel server error" };
  }
};
