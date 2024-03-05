import db from "@/lib/db";

export const getProductsInStock = async (storeId: string) => {
  const products = await db.product.findMany({
    where: {
      storeId,
      NOT: {
        isArchived: true,
      },
    },
  });

  return products.length;
};
