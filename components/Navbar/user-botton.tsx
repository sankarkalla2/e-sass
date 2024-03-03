"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "../ui/button";
import { signout } from "@/actions/logout";
import { toast } from "sonner";
import { startTransition, useEffect, useState } from "react";
import { useTransition } from "react";

import { auth } from "@/auth";
import { currentUser } from "@/hooks/current-user";
import { Switch } from "../ui/switch";
import { updateUser } from "@/actions/user";
import Link from "next/link";

const UserButton = () => {
  const [isMouted, setIsMouted] = useState(false);
  const [isLoading, setIsLoading] = useTransition();
  const user = currentUser();
  const avatarFallback =
    user?.name?.split(" ")[0].at(0) + "" + user?.name?.split(" ")[1].at(0);
  useEffect(() => {
    setIsMouted(true);
  }, []);

  if (!isMouted) return null;
  const handleSignout = () => {
    signout()
      .then(() => toast.success("Successfully logout"))
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const handleSwitch = () => {
    console.log("called");
    startTransition(() => {
      user &&
        user.id &&
        updateUser(
          { isTwoFactorEnabled: !user?.isTwoFactorEnabled },
          user.id
        ).then((data) => {
          if (data.error) {
            return toast.error(data.error);
          }
          toast.success(data.success);
          location.reload();
        });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/u/${user?.id}`}>Profile Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignout}>Logout</DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between">
          <span>2FA</span>
          <Switch
            checked={user?.isTwoFactorEnabled}
            className="h-6"
            onClick={handleSwitch}
            disabled={isLoading}
          />
        </DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
