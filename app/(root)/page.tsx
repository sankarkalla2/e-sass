import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import Modal from "@/components/ui/modal";
import ModalProvider from "@/providers/modal-provider";
import { useModalStore } from "@/hooks/use-modal-store";
import { SparklesCore } from "@/components/ui/sparkles";
import { TypewriterEffect } from "./_components/store-descriptoin";
import Navbar from "./_components/navbar";
import { FloatingNav } from "@/components/ui/floating.navbar";
import db from "@/lib/db";
import { getStoreByUserId } from "@/data/store-service";
import { redirect } from "next/navigation";

export default async function Home() {
  // const isOpen = useModalStore((state) => state.isOpen);
  // const onOpen = useModalStore((state) => state.onOpen);

  // useEffect(() => {
  //   if (!isOpen) {
  //     onOpen();
  //   }
  // }, [isOpen,  onOpen]);
  const user = await auth();
  const store =
    user?.user?.id &&
    (await db.store.findFirst({
      where: {
        userId: user?.user?.id,
      },
    }));

  const storeId = store ? store.id : "new";

  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Aceternity.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="">
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative ">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Navbar storeId={storeId} />
        <div className="flex items-center justify-center  flex-col pt-32">
          <h1 className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            WEB AGENCY
          </h1>
          <TypewriterEffect words={words} />
        </div>
      </div>
    </div>
  );
}
