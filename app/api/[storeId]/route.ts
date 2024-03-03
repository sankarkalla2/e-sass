import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  const store = await db.store.findUnique({
    where: {
      id: params.storeId,
    },
  });

  if (!store) return new NextResponse("store not found");
  return NextResponse.json(store);
};
