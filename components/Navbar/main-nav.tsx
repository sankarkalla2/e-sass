"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const MainNav = () => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}/overview`,
      label: "Overview",
      active: pathname === `/${params.storeId}/overview`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },

    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
      style: "hidden md:flex",
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
      style: "hidden md:flex",
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
      style: "hidden md:flex",
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
      style: "hidden md:flex",
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
      style: "hidden md:flex",
    },
    {
      href: `/${params.storeId}/banner`,
      label: "Banner",
      active: pathname === `/${params.storeId}/banner`,
      style: "hidden md:flex",
    },
  ];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <nav
      className={cn("flex items-center space-x-3 lg:space-x-3 xl:space-x-4")}
    >
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm text-muted-foreground hover:text-primary font-medium",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground",
            route.style
          )}
        >
          {route.label}
        </Link>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden">
          <Button className="" variant="link" size="icon">
            More
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          {routes.map(
            (route) =>
              route.style && (
                <DropdownMenuItem className={cn("cursor-pointer")}>
                  <Link href={route.href}>
                    <Link
                      href={route.href}
                      key={route.href}
                      className={cn(
                        "text-sm text-muted-foreground hover:text-primary font-medium",
                        route.active
                          ? "text-black dark:text-white"
                          : "text-muted-foreground"
                      )}
                    >
                      {route.label}
                    </Link>
                  </Link>
                </DropdownMenuItem>
              )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default MainNav;
