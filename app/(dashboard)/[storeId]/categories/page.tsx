import { getStoreById } from "@/data/store-service";
import { columns } from "./_components/columns";
import { DataTable } from "../../../../components/ui/data-table";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { getAllCategoriesByStoreId } from "@/data/categoreis-service";
import CategoriClient from "./_components/category-client";

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

  const categorie = await fetch(
    "http://localhost:3000/api/clsn4f9j200007eokl11fy4gv/categories"
  );

  console.log(categorie);

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
      {/* <ApiAlert
        title={"something"}
        variant="public"
        description={`${origin}/api/${params.storeId}`}
      /> */}
    </div>
  );
};

export default Categories;
