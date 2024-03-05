import { getStoreByUserId } from "@/data/store-service";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}
const RootLayout = async ({ children }: RootLayoutProps) => {
  // const user = await auth();
  // if (!user || !user.id) return redirect("/auth/login");

  // console.log(user.id);
  // const store = await db.store.findFirst({
  //   where: {
  //     userId: user.id,
  //   },
  // });
  // console.log(store);
  // if (store) {
  //   return redirect(`/${store.id}`);
  // }

  return <>{children}</>;
};

export default RootLayout;
