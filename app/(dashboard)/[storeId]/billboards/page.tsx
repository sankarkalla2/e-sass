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
      {/* <ApiAlert
        title={"something"}
        variant="public"
        description={`${origin}/api/${params.storeId}`}
      /> */}
    </div>
  );
};

export default Billboards;
