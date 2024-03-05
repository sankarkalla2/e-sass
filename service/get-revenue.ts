import db from "@/lib/db";

export const getRevenue = async (storeId: string) => {
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

  let totalRevenue = 0;
  for (const order of orders) {
    order.OrderItem.forEach((item) => {
      totalRevenue += totalRevenue + item.product.price.toNumber();
    });
  }

  return totalRevenue;
};
