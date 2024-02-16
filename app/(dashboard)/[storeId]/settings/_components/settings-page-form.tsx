"use client";

import { Store } from "@prisma/client";
import Heading from "./hading";
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
import { storeTitleSchema } from "@/schemas/store-title-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { deleteStore, updateStore } from "@/actions/store";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ConfrimModal from "@/components/modals/confirm-modal";
import { Alert } from "@/components/ui/alert";
import ApiAlert from "@/components/ui/api-alert";

interface SettingsPageFormProps {
  store: Store;
}
const SettingsPageForm = ({ store }: SettingsPageFormProps) => {
  const [isLoading, startTranstion] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof storeTitleSchema>>({
    resolver: zodResolver(storeTitleSchema),
    defaultValues: {
      name: store.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof storeTitleSchema>) => {
    startTranstion(() => {
      updateStore(values, store.id).then((data) => {
        if (data.error) {
          return toast.error(data.error);
        }
        toast.success(data.success);
        router.refresh();
      });
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    startTranstion(() => {
      deleteStore(store.id)
        .then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success(data.success);
          router.refresh();
          router.push("/");
        })
        .catch(() => {
          toast.error("something went wrong");
        });
    });
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
        <Heading title={store.name} description={"demo description"} />
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
      </div>
      <Separator className="" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E-commerce ..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title={"something"}
        variant="public"
        description="description"
      />
    </div>
  );
};

export default SettingsPageForm;
