import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import Social from "./social";


interface WrapperProps {
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonHref: string;
  authDescription: string;
  socialButtons?: boolean;
}
const Wrapper = ({
  children,
  backButtonHref,
  backButtonLabel,
  authDescription,
  socialButtons,
}: WrapperProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-red-500">
      <Card className="w-[400px]">
        <CardHeader className="w-full flex flex-col items-center justify-start">
          <h1 className="text-4xl font-semibold">🔐 E-Store</h1>
          <p className="text-muted-foreground pr-16">{authDescription}</p>
        </CardHeader>

        <CardContent>{children}</CardContent>
        <CardFooter className="flex flex-col gap-y-2">
          <Social />
          <Button className="w-full hover:text-blue-500" variant="link" asChild>
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Wrapper;
