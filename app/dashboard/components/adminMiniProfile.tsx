"use client";
import React from "react";
import { LogOutIcon } from "lucide-react";
import { useUser } from "@/authProvider";
import { authSignOut } from "@/server/actions/auth";

const AdminMiniProfile = () => {
  const user = useUser()!;
  return (
    <div className="flex gap-3 rounded-2xl border px-2 py-2">
      <div className="size-14 flex-shrink-0">
        <img
          src="https://avatar.iran.liara.run/public/37"
          className="size-full rounded-full"
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1">
        <div className="font-bold">{user.fullName}</div>
        <div className="text-xs font-medium">{user.phone}</div>
      </div>
      <div
        className="flex flex-shrink-0 items-center text-red-600"
        role="button"
        onClick={() => authSignOut()}
      >
        <LogOutIcon />
      </div>
    </div>
  );
};

export default AdminMiniProfile;
