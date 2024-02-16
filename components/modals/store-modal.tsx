"use client";

import Modal from "../ui/modal";
import { useModalStore } from "@/hooks/use-modal-store";
import { storeModalSchema } from "@/schemas/store-modal-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

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
import { useEffect, useTransition } from "react";
import { createStore } from "@/actions/store";
import { toast } from "sonner";

const StoreModal = () => {
  const storeModal = useModalStore();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof storeModalSchema>>({
    resolver: zodResolver(storeModalSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof storeModalSchema>) {
    startTransition(() => {
      createStore(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            return;
          }
          toast.success("Store successfully created");
          window.location.assign(`/${data.success?.id}`);
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Modal
      title="Create store"
      description="Create store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ecommerce store..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center w-full justify-end gap-x-3">
            <Button
              className="px-6"
              variant="outline"
              onClick={storeModal.onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="px-6" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StoreModal;
