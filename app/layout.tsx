import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { estedadFont } from "@/lib/fonts";
import { Toaster } from "sonner";
import ClientProviders from "@/app/clientProviders";
import AuthProvider from "@/authProvider";
import { getSession } from "@/server/actions/auth";

export const metadata: Metadata = {
  title: "جشنواره عیدانه سی تلکام - سی تلکام",
  description: "جشنواره عیدانه سی تلکام, از اول عید تا آخرش جایزه ببر!",
};

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const session = await getSession();
  return (
    <html lang="fa" dir="rtl">
      <body
        className={cn(estedadFont.variable, "overflow-x-hidden font-estedad")}
      >
        <AuthProvider session={session}>
          <ClientProviders>{children}</ClientProviders>
          <Toaster
            className="font-estedad"
            toastOptions={{ className: "font-estedad" }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
