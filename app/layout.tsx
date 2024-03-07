import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { estedadFont } from "@/lib/fonts";
import { Toaster } from "sonner";
import ClientProviders from "@/app/clientProviders";

const fallbackFont = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "جشنواره عیدانه سی تلکام - سی تلکام",
  description: "جشنواره عیدانه سی تلکام, از اول عید تا آخرش جایزه ببر!",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={cn(estedadFont.variable, "overflow-x-hidden font-estedad")}
      >
        <ClientProviders>{children}</ClientProviders>
        <Toaster />
      </body>
    </html>
  );
}
