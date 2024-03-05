"use client";
import { ModeToggle } from "@/components/Navbar/mode-toggle";
import UserButton from "@/components/Navbar/user-botton";
import { Button } from "@/components/ui/button";
import { getStoreByUserId } from "@/data/store-service";
import { currentUser } from "@/hooks/current-user";
import db from "@/lib/db";
import { Store, StoreIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = ({ storeId }: { storeId: string }) => {
  const user = currentUser();
  const router = useRouter();

  return (
    <div className="font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 h-12 flex dark:border-b px-4 items-center md:h-16 md:px-8 justify-between">
      <h2 className="text-2xl md:text-3xl flex items-center gap-x-2 ">
        <Store className="text-primary h-7 w-7 md:h-8 md:w-8" />E SASS
      </h2>
      <div className="text-primary flex gap-x-3">
        <div className="text-primary">
          {(
            <Button asChild variant="outline">
              <Link
                className="font-medium text-sm text-muted-foreground"
                href={`/${storeId}`}
              >
                Visit Store
              </Link>
            </Button>
          )}
        </div>
        <ModeToggle />
        {user ? (
          <UserButton />
        ) : (
          <Button className="" size="sm" asChild>
            <Link href={"/auth/login"}>Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
