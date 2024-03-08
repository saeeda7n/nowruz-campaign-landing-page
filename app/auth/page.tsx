import React from "react";
import AuthForm from "@/app/auth/authForm";

const Page = async () => {
  return (
    <div className="mt-auto w-full max-w-96 space-y-10">
      <div className="space-y-1">
        <h2 className="text-lg font-bold">به سی تلکام بپیوندید</h2>
        <p className="text-xs text-gray-500">
          فرق نداره قبلا عضوی از سی تلکام بودید یا نه, با وارد کردن شماره تلفن
          خودت میتونی حساب کاربری جدید بسازی یا اگر حساب کاربری داشتی وارد حسابت
          بشی!
        </p>
      </div>
      <AuthForm />
    </div>
  );
};

export default Page;
