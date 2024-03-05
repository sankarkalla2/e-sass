import { getStoreById } from "@/data/store-service";
import BillboardClient from "./_components/product-client";
import { columns } from "./_components/columns";
import { DataTable } from "../../../../components/ui/data-table";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import ApiAlert from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";
import ProductClient from "./_components/product-client";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const store = await getStoreById(params.storeId);
  if (!store) return redirect("/");
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      Image: true,
      size: true,
      color: true,
      category: true,
    },
  });

  if (![products]) return redirect("/");

  const formattedItems = products.map((item) => ({
    id: item.id,
    label: item.name,
    color: item.color.name,
    size: item.size.value,
    price: item.price,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: item.createdAt,
  }));

  return (
    <div>
      <ProductClient products={formattedItems} />
      <DataTable columns={columns} data={formattedItems} />

      <Separator />

      <div className="space-y-4 pt-5">
        <ApiAlert
          title={"GET"}
          variant="public"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/products/{productId}`}
        />
        <ApiAlert
          title={"UPDATE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/products`}
        />
        <ApiAlert
          title={"DELETE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/products/{productId}`}
        />
      </div>
    </div>
  );
};

export default Billboards;
