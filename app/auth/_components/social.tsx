"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

import { signIn } from "next-auth/react";

const Social = () => {
  return (
    <div className="w-full flex gap-x-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signIn("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signIn("github")}
      >
        <IoLogoGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;
