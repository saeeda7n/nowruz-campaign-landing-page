"use client";
import React, { useState } from "react";

const AuthForm = () => {
  const [ltr, setLtr] = useState(false);
  return (
    <form action="" className="space-y-5">
      <label className="flex flex-col gap-2">
        <span className="text-xs font-medium">شماره تلفن شما</span>
        <input
          onChange={(e) => setLtr(e.target.value.length > 0)}
          className="h-12 rounded-md border px-5"
          placeholder="شماره تلفن"
          dir={ltr ? "ltr" : "rtl"}
        />
      </label>
      <button className="h-10 rounded-md bg-blue-600 px-5 text-sm text-gray-50">
        دریافت کد تایید
      </button>
    </form>
  );
};

export default AuthForm;
