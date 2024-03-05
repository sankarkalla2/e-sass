import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { orderSchema } from "@/schemas/order-schema";
import { Order } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  try {
    const validFields = orderSchema.safeParse(await req.json());
    console.log(req.body);
    if (!validFields.success) {
      return new NextResponse("Invalid fields", { status: 400 });
    }

    const data = validFields.data;
    const existingStore = await db.store.findUnique({
      where: {
        id: data.storeId,
      },
    });

    if (!existingStore) {
      return new NextResponse("Store not found", { status: 404 });
    }

    await db.order.create({
      data: {
        ...data,
      },
    });

    return new NextResponse("Order created Successfully");
  } catch (err) {
    console.log("Error", err);
    return new NextResponse("Internel server error", { status: 500 });
  }
  4;
};
