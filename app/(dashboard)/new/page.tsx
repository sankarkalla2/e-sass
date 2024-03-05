"use client"
import { useModalStore } from "@/hooks/use-modal-store";
import { useEffect } from "react";

const CreateNewStore = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return <div>Create new Store</div>;
};

export default CreateNewStore;
