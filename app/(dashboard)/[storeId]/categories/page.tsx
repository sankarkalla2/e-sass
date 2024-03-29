import { getStoreById } from "@/data/store-service";
import { columns } from "./_components/columns";
import { DataTable } from "../../../../components/ui/data-table";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import CategoriClient from "./_components/category-client";
import ApiAlert from "@/components/ui/api-alert";

const Categories = async ({ params }: { params: { storeId: string } }) => {
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

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: {
        select: {
          label: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!categories) return redirect("/");
  if (!billboards) return redirect("/");

  const formattedItems = categories.map((item) => ({
    id: item.id,
    label: item.name,
    billboardLabel: item.billboard.label,
    createdAt: item.createdAt,
  }));
  return (
    <div>
      <CategoriClient categories={categories} />
      <DataTable columns={columns} data={formattedItems} />

      <Separator />
      <div className="space-y-4 pt-5">
        <ApiAlert
          title={"GET"}
          variant="public"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/categorie`}
        />
        <ApiAlert
          title={"POST"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/categorie`}
        />
        <ApiAlert
          title={"UPDATE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/categorie/{categorieId}`}
        />
        <ApiAlert
          title={"DELETE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/categorie/{categorieId}`}
        />
      </div>
    </div>
  );
};

export default Categories;
