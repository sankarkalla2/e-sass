"use server";

import { registerSchema } from "@/app/schemas/register-schema";
import { getUserByEmail } from "@/data/user-service";
import db from "@/lib/db";
import { generateVerificationToken } from "@/lib/generate-verification-token";
import { sendVerifyEmail } from "@/lib/resend";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Input",
    };
  }

  const { email, name, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      error: "Email already in use",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerifyEmail(verificationToken.email, verificationToken.token);
  console.log(verificationToken);
  //sent email verification

  return {
    success: "Email sent successfully",
  };
};
