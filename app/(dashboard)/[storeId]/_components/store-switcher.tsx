"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { useState } from "react";

interface StoreSwitcherProps {
  items: Store[];
}
const StoreSwitcher = ({ items }: StoreSwitcherProps) => {
  const storeModal = useModalStore();
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    router.push(`/${store.value}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between")}
        >
          <StoreIcon className="w-5 h-5 shrink-0 mr-2" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store...." />
          <CommandEmpty>No Store found</CommandEmpty>
          <CommandGroup>
            {formattedItems?.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  setOpen(false);
                  onStoreSelect(item);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentStore?.value === item.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
