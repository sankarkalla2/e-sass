import db from "@/lib/db";

export const getStoreByUserId = async (userId: string) => {
  try {
    const store = await db.store.findFirst({
      where: {
        userId,
      },
    });
    return store;
  } catch {
    return null;
  }
};

export const getAllStoresByUserId = async (userId: string) => {
  try {
    const stores = await db.store.findMany({
      where: {
        userId,
      },
    });

    return stores;
  } catch {
    return null;
  }
};
