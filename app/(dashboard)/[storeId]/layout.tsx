import Navbar from "@/components/Navbar/navbar";
import { getStoreByUserId } from "@/data/store-service";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const DashbaordLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  if (!user || !user.id) return redirect("/auth/login");

  const store = await getStoreByUserId(user.id);
  if (!store) return redirect("/");

  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
};

export default DashbaordLayout;
