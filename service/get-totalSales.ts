import db from "@/lib/db";

export const getTotalSales = async (storeId: string) => {
  const orders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      OrderItem: {
        include: {
          product: true,
        },
      },
    },
  });

  let sales = 0;
  for (const order of orders) {
    order.OrderItem.forEach((item) => {
      ++sales;
    });
  }

  return sales;
};
