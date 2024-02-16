"use client";

import Modal from "@/components/ui/modal";
import { useEffect, useState } from "react";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

interface ConfrimModalProps {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  loading: boolean;
}
const ConfrimModal = ({
  loading,
  isOpen,
  onClose,
  onConfirm,
}: ConfrimModalProps) => {
  const [isMouted, setIsmouted] = useState<Boolean>(false);
  useEffect(() => {
    setIsmouted(true);
  }, []);

  if (!isMouted) return null;
  return (
    <Modal
      title="Are You sure"
      description="This action won't undone. Data will permanently deleted from our servers"
      isOpen={isOpen}
      onClose={onClose}
    >
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={loading} onClick={onClose}>
            Close
          </Button>
        </DialogClose>
        <Button onClick={onConfirm} disabled={loading} variant='destructive'>
          Confirm
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default ConfrimModal;
