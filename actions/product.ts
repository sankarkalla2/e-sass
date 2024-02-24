"use server";

import { getStoreById } from "@/data/store-service";
import db from "@/lib/db";
import { productSchema } from "@/schemas/product-schema";
import { url } from "inspector";
import { z } from "zod";

export const createProduct = async (
  values: z.infer<typeof productSchema>,
  storeId: string
) => {
  const validatedFields = productSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const existingStore = await getStoreById(storeId);
  if (!existingStore) {
    return { error: "store not found" };
  }

  const { name, price, size, images, color, category, isFeatured, isArchived } =
    validatedFields.data;

  try {
    const product = await db.product.create({
      data: {
        storeId: existingStore.id,
        colorId: color,
        sizeId: size,
        categoryId: category,
        price,
        isFeatured,
        isArchived,
        name,
      },
      select: {
        id: true,
      },
    });

    images.map(
      async (img) =>
        await db.image.create({
          data: {
            productId: product.id,
            ulr: img.url,
          },
        })
    );

    return { success: "New product created successfully" };
  } catch {
    return { error: "Internel server error" };
  }
};

export const updateProduct = async (
  values: z.infer<typeof productSchema>,
  storeId: string,
  id: string
) => {
  const validatedFields = productSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const existingStore = await getStoreById(storeId);
  if (!existingStore) {
    return { error: "store not found" };
  }

  const { name, price, size, images, color, category, isFeatured, isArchived } =
    validatedFields.data;

  try {
    const product = await db.product.update({
      where: {
        id,
        storeId: existingStore.id,
      },
      data: {
        colorId: color,
        sizeId: size,
        categoryId: category,
        price,
        isFeatured,
        isArchived,
        name,
      },
      select: {
        id: true,
      },
    });

    await db.image.deleteMany({
      where: {
        productId: product.id,
      },
    });
    images.map(
      async (img) =>
        await db.image.create({
          data: {
            productId: product.id,
            ulr: img.url,
          },
        })
    );

    return { success: "Product Updated successfully" };
  } catch {
    return { error: "Internel server error" };
  }
};
