import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
const Modal = ({
  title,
  isOpen,
  description,
  onClose,
  children,
}: ModalProps) => {
  const onChange = () => {
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="p-0">{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
