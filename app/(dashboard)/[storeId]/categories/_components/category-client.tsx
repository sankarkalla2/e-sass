"use client";
import { Button } from "@/components/ui/button";
import Heading from "../../settings/_components/hading";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Categories } from "./columns";
import { Category } from "@prisma/client";

interface CategoriClientProps {
  categories: Category[];
}

const CategoriClient = ({ categories }: CategoriClientProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories(${categories.length})`}
          description="Manage categories for your store"
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

export default CategoriClient;
