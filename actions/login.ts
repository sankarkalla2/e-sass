"use server";

import { loginSchema } from "@/schemas/login-schema";
import { getUserByEmail, getUserById } from "@/data/user-service";
import { z } from "zod";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/generate-verification-token";
import { sendVerifyEmail } from "@/lib/resend";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid input",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "User not existed",
    };
  }

  if (!existingUser.email || !existingUser.password) {
    return {
      error: "user not found",
    };
  }
  const isCorrectPassword = await bcrypt.compare(
    password,
    existingUser.password!
  );
  if (!isCorrectPassword) {
    return {
      error: "Invalid Credentials",
    };
  }

  if (!existingUser.emailVerified) {
    const token = await generateVerificationToken(existingUser.email);
    await sendVerifyEmail(token.email, token.token);

    return {
      error: "Verify Email",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "something went wrong" };
      }
    }
  }

  return {
    success: "Successfully logged in",
  };
};
