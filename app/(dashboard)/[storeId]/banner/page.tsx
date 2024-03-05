import db from "@/lib/db";
import BannerClient from "./_components/banner-client";
import BannerForm from "./_components/banner-form";
import ApiAlert from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";

const Banner = async ({ params }: { params: { storeId: string } }) => {
  const banner = await db.banner.findUnique({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
    },
  });

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div>
      <BannerForm banner={banner} categories={categories} />

      <Separator />
      <div className="space-y-4 pt-5">
        <ApiAlert
          title={"GET"}
          variant="public"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/{bannerId}`}
        />
        <ApiAlert
          title={"POST"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/{bannerId}`}
        />
        <ApiAlert
          title={"UPDATE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/{bannerId}`}
        />
        <ApiAlert
          title={"DELETE"}
          variant="admin"
          description={`${process.env.NEXT_APP_URL}/api/${params.storeId}/{bannerId}`}
        />
      </div>
    </div>
  );
};

export default Banner;
