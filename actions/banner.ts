"use server";

import { getStoreById } from "@/data/store-service";
import db from "@/lib/db";
import { bannerSchema } from "@/schemas/banner-schema";
import { z } from "zod";

export const createdBanner = async (
  values: z.infer<typeof bannerSchema>,
  storeId: string
) => {
  const validatedFields = bannerSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: "invalid inputs",
    };

  const data = validatedFields.data;
  const store = await getStoreById(storeId);
  if (!store) {
    return { error: "store not found" };
  }
  try {
    await db.banner.create({
      data: {
        storeId: store.id,
        ...data,
      },
    });

    return { success: "new banner created successfully" };
  } catch (err) {
    return { error: "Internel server error" };
  }
};

export const updateBanner = async (
  values: z.infer<typeof bannerSchema>,
  bannerId: string
) => {
  const validatedFields = bannerSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: "invalid inputs",
    };

  const data = validatedFields.data;
  try {
    await db.banner.update({
      where: {
        id: bannerId,
      },

      data: {
        ...data,
      },
    });

    return { success: "Banner Updated successfully" };
  } catch (err) {
    console.log(err);
    return { error: "Internel server error" };
  }
};

export const deleteBanner = async (bannerId: string) => {
  try {
    const banner = await db.banner.findUnique({
      where: {
        id: bannerId,
      },
    });

    if (!banner) {
      return { error: "Banner not found" };
    }

    await db.banner.delete({
      where: {
        id: banner.id,
      },
    });

    return { success: "Banner Removed successfully" };
  } catch (err) {
    return { error: "Internel server error" };
  }
};
