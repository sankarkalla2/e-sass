"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";

interface ApiAlertProps {
  title: string | number;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert = ({
  title,
  description,
  variant = "public",
}: ApiAlertProps) => {
  return (
    <Alert>
      <Server className="h-4 w-4 mr-2" />
      <AlertTitle className="flex items-center">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
