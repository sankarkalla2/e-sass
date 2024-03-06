import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerifyEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/verify-email?token=${token}`;

  console.log(email);
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Verify Email",
    html: `<p>Verify your<a href="${confirmationLink}">Email </a></p>`,
  });
};
