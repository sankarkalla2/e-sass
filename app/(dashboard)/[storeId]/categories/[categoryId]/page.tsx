import { redirect, useParams } from "next/navigation";
import {
  getAllBillboardsByStoreId,
  getBillboardById,
} from "@/data/billboard-service";
import { UploadImage } from "@/components/upload-image";
import CategoryForm from "../_components/category-form";
import { getCategoryById } from "@/data/categoreis-service";
import db from "@/lib/db";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const billboards = await getAllBillboardsByStoreId(params.storeId);
  if (!billboards) return redirect(`/${params.storeId}/billboards/new`);

  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <div>
      <CategoryForm category={category} billboards={billboards} />
    </div>
  );
};

export default BillboardPage;
