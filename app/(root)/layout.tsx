import { getStoreByUserId } from "@/data/store-service";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}
const RootLayout = async ({ children }: RootLayoutProps) => {
  const user = await auth();
  if (!user || !user.id) return redirect("/auth/login");

  const store = await getStoreByUserId(user.id);
  if (store) {
    return redirect(`${store.id}`);
  }

  return <>{children}</>;
};

export default RootLayout;
