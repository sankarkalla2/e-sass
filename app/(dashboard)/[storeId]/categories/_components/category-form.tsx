"use client";

import { BillBoard, Category, Store } from "@prisma/client";
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
import { CategorySchema } from "@/schemas/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import ConfrimModal from "@/components/modals/confirm-modal";
import { useOrigin } from "@/hooks/use-origin";
import { UploadImage } from "@/components/upload-image";
import {
  createNewBillboard,
  deleteBillboard,
  updateBillboard,
} from "@/actions/billboard";
import { BillboardsCombo } from "./category-combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Billboard } from "../../billboards/_components/columns";
import { createNewCategory } from "@/actions/category";

interface CategoryFormProps {
  category: Category | null;
  billboards: Billboard[];
}
const CategoryForm = ({ category, billboards }: CategoryFormProps) => {
  const [isLoading, startTranstion] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const origin = useOrigin();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name || "",
      billboard: category?.billboardId || "",
    },
  });

  const CategoryLabel = category ? "Manage A Category" : "Create Category";
  const CategoryDescription = category ? "Manage Category" : "Create Category";

  const action = category ? "Save Changes" : "Create";
  const toastMessage = category ? "category changed" : "new category created";

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    console.log(values);
    startTranstion(() => {
      createNewCategory(values, params.storeId.toString()).then((data) => {
        if (data.error) {
          return toast.error(data.error);
        }

        toast.success(data.success);
        router.push(`/${params.storeId}/categories`);
      });
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    // if (billboard) {
    //   startTranstion(() => {
    //     deleteBillboard(billboard.id).then((data) => {
    //       if (data.error) {
    //         return toast.error(data.error);
    //       }
    //       toast.success(data.success);
    //       router.push(`/${params.storeId}/billboards`);
    //     });
    //   });
    // }
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
        <Heading title={CategoryLabel} description={CategoryDescription} />

        {category && (
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
          <div className="sm:w-full  md:grid grid-cols-2 xl:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="create a category..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboard"
              render={({ field }) => (
                <FormItem className="md:pl-8">
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select billBoard" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem> */}
                        {billboards.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

export default CategoryForm;
