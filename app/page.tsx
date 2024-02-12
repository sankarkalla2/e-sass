import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logout from "./auth/_components/logout";

export default async function Home() {
  const session = await auth();

 
  return (
    <main className="4">
      <div>{JSON.stringify(session)}</div>
      <Logout />
    </main>
  );
}
