import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  try {
    const isFeatured = req.nextUrl.searchParams.get("isFeatured");

    const existingStore = await db.store.findUnique({
      where: {
        id: params.storeId,
      },
    });

    if (!existingStore) {
      return new NextResponse("Store not found");
    }

    if (isFeatured) {
      const featuredProducts = await db.product.findMany({
        where: {
          storeId: existingStore.id,
          isFeatured: true,
        },
        include: {
          Image: {
            select: {
              id: true,
              ulr: true
            }
          },
          size: true,
          color: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return NextResponse.json(featuredProducts, { status: 200 });
    }

    const products = await db.product.findMany({
      where: {
        storeId: existingStore.id,
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("Errror", err);
    return new NextResponse("Internel server error", { status: 500 });
  }
};
