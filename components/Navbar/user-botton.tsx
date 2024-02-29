"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { signout } from "@/actions/logout";
import { toast } from "sonner";
import { useEffect, useState } from "react";
const UserButton = () => {
  const [isMouted, setIsMouted] = useState(false);
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">User</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignout}>
          Logout
        </DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
