"use client";

import { Product, Category, Color, Image, Sizes, Store } from "@prisma/client";
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
// import { productSchema } from "@/schemas/product-schema";
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
import { productSchema } from "@/schemas/product-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createProduct, updateProduct } from "@/actions/product";
import { Decimal } from "@prisma/client/runtime/library";
// import { Product } from "./columns";

interface ProductFormProps {
  product: (Product & { Image: Image[] }) | null;
  colors: Color[];
  sizes: Sizes[];
  categories: Category[];
}
const ProductForm = ({
  product,
  colors,
  sizes,
  categories,
}: ProductFormProps) => {
  const [isLoading, startTranstion] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const origin = useOrigin();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      price: Number(product?.price) || undefined,
      size: product?.sizeId || "",
      color: product?.colorId || "",
      isArchived: product?.isArchived || false,
      isFeatured: product?.isFeatured || false,
      category: product?.categoryId || "",
      images: product?.Image? product.Image.map((img) => ({ url: img.ulr})): []
    },
  });

  const billBaordLabel = product ? "Manage A product" : "Create product";
  const productDescription = product ? "mange a product" : "crate product";

  const action = product ? "Save Changes" : "Create";
  const toastMessage = product ? "product changed" : "product created";

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    console.log(values);
    startTranstion(() => {
      if (product) {
        updateProduct(values, product.storeId, product.id).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success(data.success);
          console.log(data.success);
          router.refresh();
        });
      } else {
        // createNewproduct(values, )
        console.log(params.storeId.toString());
        createProduct(values, params.storeId.toString()).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success(data.success);
          router.push(`/${params.storeId}/products`);
        });
      }
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    // if (product) {
    //   startTranstion(() => {
    //     deleteproduct(product.id).then((data) => {
    //       if (data.error) {
    //         return toast.error(data.error);
    //       }
    //       toast.success(data.success);
    //       router.push(`/${params.storeId}/products`);
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
        <Heading title={billBaordLabel} description={productDescription} />

        {product && (
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
          <div className="sm:w-full  md:grid grid-cols-2 xl:grid-cols-3 space-y-4 md:gap-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:pt-4">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Give a name to product ..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price ..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem value={size.id} key={size.id}>
                            {size.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem value={color.id} key={color.id}>
                            {color.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4 shadow-sm border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>IsArchived</FormLabel>
                    <FormDescription className="">
                      You can mange you anytinflkajk flajiijeij theiioijsi
                      ljfoiajioj
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4 shadow-sm border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>IsFeatured</FormLabel>
                    <FormDescription className="">
                      You can mange you anytinflkajk flajiijeij theiioijsi
                      ljfoiajioj
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cateogory</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem value={category.id} key={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UploadImage
                      value={
                        field.value ? field.value.map((value) => value.url) : []
                      }
                      onChange={(url: any) => {
                        field.onChange([...field.value, { url }]);
                      }}
                    />
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

export default ProductForm;
