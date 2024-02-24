import db from "@/lib/db";

export const getSizeById = async (id: string) => {
  try {
    return await db.sizes.findUnique({
      where: {
        id,
      },
    });
  } catch {
    return null;
  }
};

export const getAllSizes = async (storeId: string) => {
  try {
    return await db.sizes.findMany({
      where: {
        storeId,
      },
    });
  } catch {
    return null;
  }
};
