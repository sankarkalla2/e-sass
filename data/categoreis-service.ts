import { auth } from "@/lib/auth";
import db from "@/lib/db";

export const getAllCategoriesByStoreId = async (id: string) => {
  try {
    const categories = await db.category.findMany({
      where: {
        storeId: id,
      },
    });

    return categories;
  } catch {
    return null;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  } catch {
    return null;
  }
};
