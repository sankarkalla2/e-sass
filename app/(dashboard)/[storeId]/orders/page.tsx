import { getStoreById } from "@/data/store-service";
import BillboardClient from "./_components/orders-client";
import { columns } from "./_components/columns";
import { DataTable } from "../../../../components/ui/data-table";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import ApiAlert from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";
import OrdersClient from "./_components/orders-client";
import { Label } from "@radix-ui/react-label";
import { IoMdThermometer } from "react-icons/io";

const Orders = async ({ params }: { params: { storeId: string } }) => {
  const store = await getStoreById(params.storeId);
  if (!store) return redirect("/");
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      OrderItem: {
        include: {
          product: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (!orders) return redirect("/");

  const formattedItems = orders.map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    orderId: item.orderId,
  }));
  return (
    <div>
      <OrdersClient orders={orders} />
      <DataTable columns={columns} data={formattedItems} />

      <Separator />
      {/* <ApiAlert
        title={"something"}
        variant="public"
        description={`${origin}/api/${params.storeId}`}
      /> */}
    </div>
  );
};

export default Orders;
