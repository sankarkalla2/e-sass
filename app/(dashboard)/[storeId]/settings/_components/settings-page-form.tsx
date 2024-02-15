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

interface SettingsPageFormProps {
  store: Store;
}
const SettingsPageForm = ({ store }: SettingsPageFormProps) => {
  const form = useForm<z.infer<typeof storeTitleSchema>>({
    resolver: zodResolver(storeTitleSchema),
    defaultValues: {
      name: store.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof storeTitleSchema>) => {
    console.log(values);
  };
  return (
    <div>
      <div className="flex items-center w-full justify-between pb-2">
        <Heading title={store.name} description={"demo description"} />
        <Button
          className=""
          variant="destructive"
          size="icon"
          onClick={() => {}}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      <Separator className="" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="E-commerce ..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPageForm;
