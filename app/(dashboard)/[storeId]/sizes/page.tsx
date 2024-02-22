import { getStoreById } from "@/data/store-service";
import BillboardClient from "./_components/sizes-client";
import { columns } from "./_components/columns";
import { DataTable } from "../../../../components/ui/data-table";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import ApiAlert from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";
import SizeClient from "./_components/sizes-client";

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  const store = await getStoreById(params.storeId);
  if (!store) return redirect("/");

  const sizes = await db.sizes.findMany({
    where: {
      storeId: params.storeId,
    },
    select: {
      id: true,
      value: true,
      name: true,
      createdAt: true,
    },
  });

  if (!sizes) return null;

  const formattedItems = sizes.map((item) => ({
    id: item.id,
    label: item.name,
    createdAt: item.createdAt,
    value: item.value,
  }));
  return (
    <div>
      <SizeClient sizes={formattedItems} />
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

export default Sizes;
