"use client";

import { deleteBillboard } from "@/actions/billboard";
import ConfrimModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
  id: string;
}
const Actions = ({ id }: ActionProps) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, startTransiton] = useTransition();
  const [open, setOpen] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(id);
    toast.success("copied to clipboard");
  };

  const onUpdate = () => {
    router.push(`/${params.storeId}/products/${id}`);
  };

  const onDelete = () => {
    startTransiton(() => {
      deleteBillboard(id)
        .then((data) => {
          if (data.error) toast.error(data.error);
          else toast.success(data.success);
        })
        .catch((err) => {
          toast.error("something went wrong");
        });

      setOpen(false);
      router.refresh()
    });
  };
  return (
    <>
      <ConfrimModal
        onConfirm={onDelete}
        isOpen={open}
        loading={isLoading}
        onClose={() => {
          setOpen(false);
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="w-full text-center cursor-pointer font-semibold"
            onClick={onCopy}
          >
            <Copy className="h-4 w-4 mr-2" />
            <h3>Copy ID</h3>
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            className="w-full text-end cursor-pointer font-semibold"
            onClick={onUpdate}
          >
            <Pencil className="w-4 h-4 mr-2" />
            <h3>Update</h3>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full text-center cursor-pointer font-semibold"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <h3>Delete</h3>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
