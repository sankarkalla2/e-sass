import db from "@/lib/db";

export const getAllOrdersByStoreId = async (storeId: string) => {
  try {
    const orders = await db.order.findMany({
      where: {
        storeId,
      },
    });

    return orders;
  } catch {
    return null;
  }
};
