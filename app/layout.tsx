import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { SessionProvider, useSession } from "next-auth/react";

import { auth } from "@/auth";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "E SASS",
  description: "Create unlimited store using e sass",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const CrispWithNoSSR = dynamic(
    () => import('../components/crisp')
  )
  return (
    <html lang="en">
      <CrispWithNoSSR />
      <SessionProvider session={session}>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" richColors />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
