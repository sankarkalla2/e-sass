"use client";

import { Store, Color } from "@prisma/client";
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
import { colorSchema } from "@/schemas/color-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import ConfrimModal from "@/components/modals/confirm-modal";
import { Alert } from "@/components/ui/alert";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { UploadImage } from "@/components/upload-image";
import { createColor, deletecolor, updatecolor } from "@/actions/color";

interface ColorsFormProps {
  color: Color | null;
}
const ColorsForm = ({ color }: ColorsFormProps) => {
  const [isLoading, startTranstion] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const origin = useOrigin();

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: color?.name || "",
      value: color?.value || "",
    },
  });

  const billBaordLabel = color ? "Manage A Store" : "Create Store";
  const colorDescription = color ? "mange a store" : "crate store";

  const action = color ? "Save Changes" : "Create";
  const toastMessage = color ? "store changed" : "store created";

  const onSubmit = async (values: z.infer<typeof colorSchema>) => {
    console.log(values);
    startTranstion(() => {
      if (color) {
        updatecolor(values, color.storeId, color.id).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          router.refresh();
          toast.success(data.success);
        });
      } else {
        createColor(values, params.storeId.toString()).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success("color updated successfully");
          console.log(data.success);
          router.push(`/${params.storeId}/colors`);
        });
      }
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    if (color) {
      startTranstion(() => {
        deletecolor(color.id).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success(data.success);
          router.push(`/${params.storeId}/colors`);
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
        <Heading title={billBaordLabel} description={colorDescription} />

        {color && (
          <Button
            className=""
            variant="destructive"
            color="icon"
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
                    <Input
                      placeholder="give new name for color..."
                      {...field}
                    />
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
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder="color ..." {...field} />
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

export default ColorsForm;
