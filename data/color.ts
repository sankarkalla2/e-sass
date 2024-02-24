import db from "@/lib/db";

export const getColorById = async (id: string) => {
  try {
    return await db.color.findUnique({
      where: {
        id,
      },
    });
  } catch {
    return null;
  }
};

export const getAllColors = async (storeId: string) => {
  try {
    return await db.color.findMany({
      where: {
        storeId,
      },
    });
  } catch {
    return null;
  }
};
