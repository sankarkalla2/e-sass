import Navbar from "@/components/Navbar/navbar";
import { getStoreByUserId } from "@/data/store-service";
import { auth } from "@/lib/auth";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const DashbaordLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="p-4 md:px-8 lg:px-20 xl:px-32">{children}</main>
    </>
  );
};

export default DashbaordLayout;
