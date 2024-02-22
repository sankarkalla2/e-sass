import { auth } from "@/lib/auth";
import BillboardClient from "../_components/color-cleint";
import { redirect, useParams } from "next/navigation";
import { getBillboardById } from "@/data/billboard-service";
import { UploadImage } from "@/components/upload-image";
import { getSizeById } from "@/data/size";
import ColorsForm from "../_components/colors-form";
import { getColorById } from "@/data/color";

const SizePage = async ({ params }: { params: { colorId: string } }) => {
  const color = await getColorById(params.colorId);

  return (
    <div>
      <ColorsForm color={color} />
    </div>
  );
};

export default SizePage;
