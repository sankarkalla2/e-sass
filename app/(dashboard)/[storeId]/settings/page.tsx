import { getStoreByUserId } from "@/data/store-service";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SettingsPageForm from "./_components/settings-page-form";

const SettingsPage = async() => {

  const user = await auth();
  if(!user || !user.id) return redirect('/auth/login')

  const store = await getStoreByUserId(user.id);
  if(!store) redirect('/')


  return <div>
    <SettingsPageForm store={store}/>
  </div>;
};

export default SettingsPage;
