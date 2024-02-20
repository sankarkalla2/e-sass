"use server";

import { getBillboardById } from "@/data/billboard-service";
import { getStoreById } from "@/data/store-service";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { billBoardSchema } from "@/schemas/billboard-schema";
import { TypeOf, z } from "zod";

export const createNewBillboard = async (
  values: z.infer<typeof billBoardSchema>,
  storeId: string
) => {
  const validatedFields = billBoardSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: "Input are not valid",
    };

  const { imgUrl, label } = validatedFields.data;

  try {
    const user = await auth();
    if (!user || !user.id) {
      return { error: "You are not authenticated" };
    }

    const existingStore = await getStoreById(storeId);
    if (!existingStore) {
      return { error: "Store is not found" };
    }

    const billboard = await db.billBoard.create({
      data: {
        label,
        imgUrl,
        storeId: existingStore.id,
      },
    });

    return {
      success: billboard,
    };
  } catch {
    return {
      error: "Internel server error",
    };
  }
};

export const updateBillboard = async (
  values: z.infer<typeof billBoardSchema>,
  storeId: string
) => {
  const validatedFields = billBoardSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: "Input are not valid",
    };

  const { imgUrl, label } = validatedFields.data;

  try {
    const user = await auth();
    if (!user || !user.id) {
      return { error: "you are unauthrized" };
    }

    const existingStore = await getStoreById(storeId);
    if (!existingStore) {
      return { error: "Store not found" };
    }

    const updatedBillboard = await db.billBoard.updateMany({
      where: {
        storeId: existingStore.id,
      },
      data: {
        ...values,
      },
    });

    return {
      success: updateBillboard,
    };
  } catch {
    return { error: "Internel Server Error" };
  }
};

export const deleteBillboard = async (id: string) => {
  const user = await auth();
  if (!user || !user.id) {
    return { error: "You are unauthrized" };
  }

  try {
    const existingBillboard = await getBillboardById(id);
    if (!existingBillboard) {
      return { error: "Billboard not found" };
    }

    await db.billBoard.delete({
      where: {
        id: existingBillboard.id,
      },
    });

    return { success: "Billboard deleted successfully" };
  } catch {
    return { error: "Internel server error" };
  }
};
