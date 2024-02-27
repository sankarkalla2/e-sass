import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const store = await db.store.findUnique({
      where: {
        id: params.storeId,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 400 });
    }

    const existingBillboard = await db.billBoard.findUnique({
      where: {
        storeId: params.storeId,
        id: params.billboardId,
      },
    });

    return NextResponse.json(existingBillboard, { status: 200 });
  } catch (err) {
    return new NextResponse("Internel server error", { status: 500 });
  }
};
