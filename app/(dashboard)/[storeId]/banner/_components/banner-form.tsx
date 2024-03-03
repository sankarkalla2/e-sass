"use client";

import { Banner, Category, Store } from "@prisma/client";
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
import { bannerSchema } from "@/schemas/banner-schema";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createdBanner, deleteBanner, updateBanner } from "@/actions/banner";
// import {
//   createNewbanner,
//   deletebanner,
//   updatebanner,
// } from "@/actions/banner";

interface BannerFormProps {
  banner: (Banner & { category: Category | null }) | null;
  categories: Category[];
}
const BannerForm = ({ banner, categories }: BannerFormProps) => {
  const [isLoading, startTranstion] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const origin = useOrigin();

  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      name: banner?.name || "",
      categoryId: banner?.categoryId || "",
      offer: banner?.offer || 0,
    },
  });

  const billBaordLabel = banner ? "Manage A Banner" : "Create Banner";
  const bannerDescription = "offer applied on selected category";

  const action = banner ? "Save Changes" : "Create";
  const toastMessage = banner ? "banner changed" : "banner created";

  const onSubmit = async (values: z.infer<typeof bannerSchema>) => {
    startTranstion(() => {
      if (banner) {
        updateBanner(values, banner.id).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success("banner updated successfully");
          console.log(data.success);
          router.refresh();
        });
      } else {
        createdBanner(values, params.storeId.toString()).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success("Banner  created successfully");
          router.push(`/${params.storeId}/banner`);
        });
      }
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    if (banner) {
      startTranstion(() => {
        deleteBanner(banner.id).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }

          toast.success(data.success);
          location.reload();
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
        <Heading title={billBaordLabel} description={bannerDescription} />

        {banner && (
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:space-y-8"
        >
          <div className="sm:w-full  md:grid grid-cols-2 xl:grid-cols-3 space-y-8 md:space-x-0 md:gap-x-4 md:space-y-0">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Create banner ..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Discount on Selected Category ..."
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
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

export default BannerForm;
