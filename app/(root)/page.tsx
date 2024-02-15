"use client";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import Modal from "@/components/ui/modal";
import ModalProvider from "@/providers/modal-provider";
import { useModalStore } from "@/hooks/use-modal-store";
import { useEffect } from "react";

export default function Home() {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen,  onOpen]);
  return <main className="4">Hello world</main>;
}
