"use client";

import { signOut } from "next-auth/react";
import { currentUser } from "@/hooks/current-user";
const Logout = () => {
  const user = currentUser();
  const onclick = () => {
    console.log(user);
    signOut();
  };
  return <button onClick={onclick}>Logout</button>;
};

export default Logout;
