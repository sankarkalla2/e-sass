"use client";

import { BillBoard, Store } from "@prisma/client";
import Heading from "../../settings/_components/hading";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { billBoardSchema } from "@/schemas/billboard-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { deleteStore, updateStore } from "@/actions/store";

import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import ConfrimModal from "@/components/modals/confirm-modal";
import { Alert } from "@/components/ui/alert";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { UploadImage } from "@/components/upload-image";
import {
  createNewBillboard,
  deleteBillboard,
  updateBillboard,
} from "@/actions/billboard";

interface BillBoardFormProps {
  billboard: BillBoard | null;
}
const BillBoardForm = ({ billboard }: BillBoardFormProps) => {
  const [isLoading, startTranstion] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const origin = useOrigin();

  const form = useForm<z.infer<typeof billBoardSchema>>({
    resolver: zodResolver(billBoardSchema),
    defaultValues: {
      label: billboard?.label || "",
      imgUrl: billboard?.imgUrl || "",
    },
  });

  const billBaordLabel = billboard ? "Manage A Billboard" : "Create Billboard";
  const billBoardDescription = billboard
    ? "mange a billboard"
    : "crate billboard";

  const action = billboard ? "Save Changes" : "Create";
  const toastMessage = billboard ? "billboard changed" : "billboard created";

  const onSubmit = async (values: z.infer<typeof billBoardSchema>) => {
    startTranstion(() => {
      if (billboard) {
        updateBillboard(values, billboard.storeId).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success("billboard updated successfully");
          console.log(data.success);
          router.refresh();
        });
      } else {
        // createNewBillboard(values, )
        console.log(params.storeId.toString());
        createNewBillboard(values, params.storeId.toString()).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }

          toast.success("Dashbaord created created successfully");
          router.push(`/${params.storeId}/billboards/${data.success?.id}`);
          console.log(data.success?.id);
        });
      }
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    if (billboard) {
      startTranstion(() => {
        deleteBillboard(billboard.id).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }

          toast.success(data.success);
          router.push(`/${params.storeId}/billboards`);
        });
      });
    }
  };

  return (
    <div className="space-y-4">
      <ConfrimModal
        onClose={onClose}
        onConfirm={onConfirm}
        isOpen={open}
        loading={isLoading}
      />
      <div className="flex items-center w-full justify-between">
        <Heading title={billBaordLabel} description={billBoardDescription} />

        {billboard && (
          <Button
            className=""
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        )}
      </div>
      <Separator className="" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="sm:w-full  md:grid grid-cols-2 xl:grid-cols-3 space-x-8 space-y-8">
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <UploadImage
                      value={field.value ? [field.value] : []}
                      onChange={(url: any) => {
                        field.onChange(url);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Create billboard ..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </div>
  );
};

export default BillBoardForm;
