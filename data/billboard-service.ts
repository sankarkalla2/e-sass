import { auth } from "@/lib/auth";
import db from "@/lib/db";

export const getBillboardById = async (id: string) => {
  try {
    const existingBillboard = await db.billBoard.findUnique({
      where: {
        id,
      },
    });

    return existingBillboard;
  } catch {
    return null;
  }
};

export const getAllBillboardsByStoreId = async (storeId: string) => {
  try {
    const billboards = await db.billBoard.findMany({
      where: {
        storeId,
      },
    });

    return billboards;
  } catch {
    return null;
  }
};
