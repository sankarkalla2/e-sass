import { getAllCategoriesByStoreId } from "@/data/categoreis-service";
import { getStoreById } from "@/data/store-service";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const store = await db.store.findUnique({
      where: {
        id: params.storeId,
      },
    });
    if (!store) {
      return new NextResponse("Store is not found", { status: 403 });
    }

    const categories = await db.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (err: any) {
    return new NextResponse("Internel server error", { status: 500 });
  }
};
