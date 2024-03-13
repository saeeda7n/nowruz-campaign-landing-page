import React, { PropsWithChildren } from "react";
import { getSession } from "@/server/actions/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: PropsWithChildren) => {
  const { user } = await getSession();
  if (user && user.newAccount) redirect("/auth/profile");
  return (
    <div className="relative mx-auto max-w-[1940px] overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout;
