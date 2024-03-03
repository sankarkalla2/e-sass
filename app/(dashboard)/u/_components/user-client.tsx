import { Separator } from "@/components/ui/separator";

import Heading from "../../[storeId]/settings/_components/hading";
import { Button } from "@/components/ui/button";

const UserClient = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-y-2 flex-col">
        <Heading
          title={`Profile Settings`}
          description="Manage You profile settings"
        />
      </div>
      <Separator />
      <Button
        className="text-muted-foreground hover:text-primary ml-10 text-blue-400 underline"
        variant="link"
        size="icon"
      >
        Back to dashboard
      </Button>
    </div>
  );
};

export default UserClient;
