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
