"use client";
import { Button } from "@/components/ui/button";
import Heading from "../../settings/_components/hading";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Billboard } from "./columns";

interface BillboardClientProps {
  billboards: Partial<Billboard[]>;
}

const BillboardClient = ({ billboards }: BillboardClientProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards(${billboards.length})`}
          description="Manage billboards for your store"
        />
        <Button asChild>
          <Link href={`${pathname}/new`}>
            <Plus className="w-5 h-5 mr2" />
            Add New
          </Link>
        </Button>
      </div>
      <Separator />
    </div>
  );
};

export default BillboardClient;
