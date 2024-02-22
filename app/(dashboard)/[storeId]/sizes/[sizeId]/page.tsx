import { auth } from "@/lib/auth";
import BillboardClient from "../_components/sizes-client";
import BillBoardForm from "../_components/size-form";
import { redirect, useParams } from "next/navigation";
import { getBillboardById } from "@/data/billboard-service";
import { UploadImage } from "@/components/upload-image";
import SizesForm from "../_components/size-form";
import { getSizeById } from "@/data/size";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await getSizeById(params.sizeId);

  return (
    <div>
      <SizesForm size={size} />
    </div>
  );
};

export default SizePage;
