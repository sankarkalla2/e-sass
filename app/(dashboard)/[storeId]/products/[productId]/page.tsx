import { auth } from "@/lib/auth";
import BillboardClient from "../_components/product-client";
import BillBoardForm from "../_components/product-form";
import { redirect, useParams } from "next/navigation";
import { getBillboardById } from "@/data/billboard-service";
import { UploadImage } from "@/components/upload-image";
import db from "@/lib/db";
import { getAllColors } from "@/data/color";
import { getAllSizes } from "@/data/size";
import { getAllCategoriesByStoreId } from "@/data/categoreis-service";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      Image: true,
    },
  });

  const colors = await getAllColors(params.storeId);
  const sizes = await getAllSizes(params.storeId);
  const categories = await getAllCategoriesByStoreId(params.storeId);

  if (!colors || !sizes || !categories) return redirect("/");

  return (
    <div>
      <BillBoardForm
        product={product}
        colors={colors}
        sizes={sizes}
        categories={categories}
      />
    </div>
  );
};

export default ProductPage;
