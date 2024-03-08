import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { estedadFont } from "@/lib/fonts";
import { Toaster } from "sonner";
import ClientProviders from "@/app/clientProviders";
import AuthProvider from "@/authProvider";
import { validateRequest } from "@/lib/auth";

const fallbackFont = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "جشنواره عیدانه سی تلکام - سی تلکام",
  description: "جشنواره عیدانه سی تلکام, از اول عید تا آخرش جایزه ببر!",
};

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const session = await validateRequest();
  return (
    <html lang="fa" dir="rtl">
      <body
        className={cn(estedadFont.variable, "overflow-x-hidden font-estedad")}
      >
        <AuthProvider session={session}>
          <ClientProviders>{children}</ClientProviders>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
