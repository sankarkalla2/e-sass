"use server";

import { getVerificationTokenByToken } from "@/data/verification-token-service";
import db from "@/lib/db";

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token Not found",
    };
  }

  //do check is token valid
  const isValid = new Date(existingToken.expires) > new Date();
  if (!isValid) {
    return {
      error: "Token Expired",
    };
  }

  try {
    //verifyEmail
    await db.user.update({
      where: {
        email: existingToken.email,
      },
      data: {
        email: existingToken.email,
        emailVerified: new Date(),
      },
    });

    //delete verificationToken
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "Email Verified successfully",
    };
  } catch {
    return {
      error: "Something went wrong",
    };
  }
};
