import StoreSwitcher from "@/app/(dashboard)/[storeId]/_components/store-switcher";
import MainNav from "./main-nav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllStoresByUserId } from "@/data/store-service";
import UserButton from "./user-botton";

const Navbar = async () => {
  const user = await auth();
  if (!user || !user.id) return redirect("/auth/login");

  const stores = await getAllStoresByUserId(user.id);
  if (!stores) return redirect("/");

  return (
    <div className="h-16 border-b shadow-sm flex items-center px-4 justify-between">
      <div className="flex items-center gap-x-3">
        <StoreSwitcher items={stores} />
        <MainNav />
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
