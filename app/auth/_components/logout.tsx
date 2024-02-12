"use client";

import { signOut } from "next-auth/react";
const Logout = () => {
  const onclick = () => {
    signOut();
  };
  return <button onClick={onclick}>Logout</button>;
};

export default Logout;
