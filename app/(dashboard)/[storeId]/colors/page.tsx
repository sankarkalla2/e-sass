import { getStoreById } from "@/data/store-service";
import BillboardClient from "./_components/color-cleint";
import { columns } from "./_components/columns";
import { DataTable } from "../../../../components/ui/data-table";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import ApiAlert from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";
import ColorClient from "./_components/color-cleint";

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  const store = await getStoreById(params.storeId);
  if (!store) return redirect("/");

  const colors = await db.color.findMany({
    where: {
      storeId: store.id,
    },
    select: {
      id: true,
      value: true,
      name: true,
      createdAt: true,
    },
  });

  if (!colors) return null;

  const formattedItems = colors.map((item) => ({
    id: item.id,
    label: item.name,
    createdAt: item.createdAt,
    value: item.value,
  }));
  return (
    <div>
      <ColorClient sizes={formattedItems} />
      <DataTable columns={columns} data={formattedItems} />

      <Separator />

      <div className="space-y-4 pt-5">
        <ApiAlert
          title={"GET"}
          variant="public"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/colors`}
        />
        <ApiAlert
          title={"POST"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/colors`}
        />
        <ApiAlert
          title={"UPDATE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/colors/{colorId}`}
        />
        <ApiAlert
          title={"DELETE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/colors/{colorId}`}
        />
      </div>
    </div>
  );
};

export default Sizes;
