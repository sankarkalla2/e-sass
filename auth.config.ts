import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import Credentials from "next-auth/providers/credentials";
import { User } from "@prisma/client";

import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas/login-schema";
import { getUserByEmail } from "./data/user-service";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;
          return user;
        }

        //TODO 2fa verification
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
