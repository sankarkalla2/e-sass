import { Button } from "@/components/ui/button";
import Heading from "../../settings/_components/hading";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BillboardClient = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for your store"
        />
        <Button>
          <Plus className="w-5 h-5 mr2" />
          Add New
        </Button>
      </div>
      <Separator />
    </div>
  );
};

export default BillboardClient;
