import { auth } from "@/lib/auth";
import BillboardClient from "../_components/orders-client";
import BillBoardForm from "../_components/billboard-form";
import { redirect, useParams } from "next/navigation";
import { getBillboardById } from "@/data/billboard-service";
import { UploadImage } from "@/components/upload-image";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await getBillboardById(params.billboardId);

  return (
    <div>
      <BillBoardForm billboard={billboard} />
    </div>
  );
};

export default BillboardPage;
