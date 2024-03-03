import { getUserById } from "@/data/user-service";
import ProfileSettings from "../_components/profile-settings";
import UserClient from "../_components/user-client";
import { redirect } from "next/navigation";
import db from "@/lib/db";

interface UserSettingsPros {
  params: { userId: string };
}

const UserSettings = async ({ params }: UserSettingsPros) => {
  const currentUser = await db.user.findUnique({
    where: {
      id:'clt6xco1l0006yqqost4hlwls'
    },
  });

  if (!currentUser) return redirect("/");
  return (
    <div className="p-4 md:px-8 lg:px-20 xl:px-32">
      <UserClient />
      <ProfileSettings user={currentUser} />
    </div>
  );
};

export default UserSettings;
