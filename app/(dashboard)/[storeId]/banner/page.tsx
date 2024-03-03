import db from "@/lib/db";
import BannerClient from "./_components/banner-client";
import BannerForm from "./_components/banner-form";

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
    </div>
  );
};

export default Banner;
