import { create } from "zustand";

interface UseModalStoreProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
export const useModalStore = create<UseModalStoreProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
