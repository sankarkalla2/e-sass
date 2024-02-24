"use client";
import { Button } from "@/components/ui/button";
import Heading from "../../settings/_components/hading";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Product } from "./columns";

interface ProductClientProps {
  products: Product[];
}

const ProductClient = ({ products }: ProductClientProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage prodcuts for your store"
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

export default ProductClient;
