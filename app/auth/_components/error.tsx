import { Button } from "@/components/ui/button";
import { CgDanger } from "react-icons/cg";

const Error = ({ message }: { message: string }) => {
  return (
    <div className="flex gap-x-2 w-full items-center justify-center bg-destructive text-white px-3 py-2 rounded-md shadow-md">
      <CgDanger className="w-5 h-5" />
      {message}
    </div>
  );
};

export default Error;
