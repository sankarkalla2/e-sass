import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const CreateNewLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  if (!user || !user.id) return redirect("/login");

  const store = await db.store.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (store) return redirect(`/${store.id}`);
  return <>{children}</>;
};

export default CreateNewLayout;
