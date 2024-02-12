import { auth as Auth } from "@/auth";

export const auth = async () => {
  const data = await Auth();
  return data?.user;
};
