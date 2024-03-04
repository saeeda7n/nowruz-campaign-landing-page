import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { estedadFont } from "@/lib/fonts";
import { Toaster } from "sonner";

const fallbackFont = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "جشنواره عیدانه سی تلکام - سی تلکام",
  description: "جشنواره عیدانه سی تلکام, از اول عید تا آخرش جایزه ببر!",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={cn(estedadFont.variable, "font-estedad overflow-x-hidden")}
      >
        <div className="relative mx-auto max-w-[1940px]">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
