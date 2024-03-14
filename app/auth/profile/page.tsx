import React from "react";
import NameForm from "@/app/auth/profile/nameForm";
import { getSession } from "@/server/actions/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جشنواره عیدانه سی تلکام - ثبت نام",
  description: "جشنواره عیدانه سی تلکام, از اول عید تا آخرش جایزه ببر!",
};
const Page = async () => {
  const { user } = await getSession();
  if (user && !user.newAccount) redirect("/");
  return (
    <div className="mt-auto w-full max-w-96 space-y-10">
      <div className="space-y-1">
        <h2 className="text-lg font-bold">
          به <span className="text-orange-400">سی</span>{" "}
          <span className="text-blue-800">تلکام</span> خوش اومدی
        </h2>
        <p className="text-xs text-gray-500">
          برای ادامه کافیه یک بار خودت رو به ما معرفی کنی تا بتونیم بعد از این
          شمارو با اسمتون صدا کنیم :)
        </p>
      </div>
      <NameForm />
    </div>
  );
};

export default Page;
