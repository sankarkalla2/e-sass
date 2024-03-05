import { getStoreById } from "@/data/store-service";
import BillboardClient from "./_components/billboard-client";
import { columns } from "./_components/columns";
import { DataTable } from "../../../../components/ui/data-table";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import ApiAlert from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const store = await getStoreById(params.storeId);
  if (!store) return redirect("/");
  const billboards = await db.billBoard.findMany({
    where: {
      storeId: params.storeId,
    },
    select: {
      createdAt: true,
      id: true,
      label: true,
    },
  });

  if (!billboards) return redirect("/");

  return (
    <div>
      <BillboardClient billboards={billboards} />
      <DataTable columns={columns} data={billboards} />

      <Separator />

      <div className="space-y-4 pt-5">
        <ApiAlert
          title={"GET"}
          variant="public"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/billboards`}
        />
        <ApiAlert
          title={"POST"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/billboards`}
        />
        <ApiAlert
          title={"UPDATE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/billboard/{billboardId}`}
        />
        <ApiAlert
          title={"DELETE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/billboard/{billboardId}`}
        />
      </div>
    </div>
  );
};

export default Billboards;
