"use client";

import { Sizes, Store } from "@prisma/client";
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
import { sizeSchema } from "@/schemas/size-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import ConfrimModal from "@/components/modals/confirm-modal";
import { Alert } from "@/components/ui/alert";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { UploadImage } from "@/components/upload-image";
import { createSize, deleteSize, updateSize } from "@/actions/size";
import { deleteStore } from "@/actions/store";
// import {
//   createNewsize,
//   deletesize,
//   updatesize,
// } from "@/actions/size";

interface SizesFormProps {
  size: Sizes | null;
}
const SizesForm = ({ size }: SizesFormProps) => {
  const [isLoading, startTranstion] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const origin = useOrigin();

  const form = useForm<z.infer<typeof sizeSchema>>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: size?.name || "",
      value: size?.value || "",
    },
  });

  const billBaordLabel = size ? "Manage A Size" : "Create Size";
  const sizeDescription = size ? "mange a size" : "crate size";

  const action = size ? "Save Changes" : "Create";
  const toastMessage = size ? "size changed" : "size created";

  const onSubmit = async (values: z.infer<typeof sizeSchema>) => {
    console.log(values);
    startTranstion(() => {
      if (size) {
        updateSize(values, size.storeId, size.id).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }

          router.refresh();
          toast.success(data.success);
        });
      } else {
        createSize(values, params.storeId.toString()).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success("size updated successfully");
          console.log(data.success);
          router.push(`/${params.storeId}/sizes`);
        });
      }
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    if (size) {
      startTranstion(() => {
        deleteSize(size.id).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success(data.success);
          router.push(`/${params.storeId}/sizes`);
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
        <Heading title={billBaordLabel} description={sizeDescription} />

        {size && (
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
          <div className="sm:w-full  md:grid grid-cols-2 xl:grid-cols-3 space-y-4 md:space-y-0">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="give new name for size..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="md:pl-6">
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder="Size ..." {...field} />
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

export default SizesForm;
