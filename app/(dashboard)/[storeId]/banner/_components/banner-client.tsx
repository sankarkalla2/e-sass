"use client";
import { Button } from "@/components/ui/button";
import Heading from "../../settings/_components/hading";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BannerClientProps {
  banner: any;
}

const BannerClient = ({ banner }: BannerClientProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Banner`}
          description="Manage banner for updates on store"
        />
      </div>
      <Separator />
    </div>
  );
};

export default BannerClient;
