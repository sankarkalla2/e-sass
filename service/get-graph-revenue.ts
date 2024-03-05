import db from "@/lib/db";

interface GraphData {
  name: string;
  total: number;
}
export const graphRevernue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
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

  console.log(paidOrders)

  const monthlyRevernue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();

    let revenueOrder = 0;

    for (const item of order.OrderItem) {
      revenueOrder += item.product.price.toNumber();
    }

    monthlyRevernue[month] = (monthlyRevernue[month] || 0) + revenueOrder;
  }
  const graphData: GraphData[] = [
    {
      name: "Jan",
      total: 0,
    },
    {
      name: "Feb",
      total: 0,
    },
    {
      name: "Mar",
      total: 0,
    },
    {
      name: "Apr",
      total: 0,
    },
    {
      name: "May",
      total: 0,
    },
    {
      name: "Jun",
      total: 0,
    },
    {
      name: "Jul",
      total: 0,
    },
    {
      name: "Aug",
      total: 0,
    },
    {
      name: "Sep",
      total: 0,
    },
    {
      name: "Nov",
      total: 0,
    },
    {
      name: "Dec",
      total: 0,
    },
  ];

  for (const month in monthlyRevernue) {
    graphData[parseInt(month)].total = monthlyRevernue[parseInt(month)];
  }

  return graphData;
};
