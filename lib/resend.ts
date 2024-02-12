import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerifyEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "sankarkalla04@gmail.com",
    subject: "Verify Email",
    html: `<p>Verify your<a href="${confirmationLink}">Email </a></p>`,
  });
};
