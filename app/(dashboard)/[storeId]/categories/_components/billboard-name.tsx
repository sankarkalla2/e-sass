"use client";

import { getBillboardById } from "@/data/billboard-service";
import db from "@/lib/db";
import { useEffect, useState } from "react";

interface BillboardNameProps {
  billboardId: string;
}
const BillboardName = ({ billboardId }: BillboardNameProps) => {
  const [name, setName] = useState<string | undefined>("");
  console.log(billboardId);
  useEffect(() => {
    const getBillboardName = async () => {
      const billboard = await getBillboardById(billboardId);

      console.log(billboard);
      setName(billboard?.label);
    };

    getBillboardName();
  }, [billboardId]);
  return <div>{name}</div>;
};

export default BillboardName;
