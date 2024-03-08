"use client";
import React, { createContext, PropsWithChildren, useContext } from "react";
import { SessionProps } from "@/lib/auth";

const authContext = createContext<{ session: SessionProps }>({
  session: { session: null, user: null },
});

export const useSession = () => useContext(authContext).session.session;
export const useUser = () => useContext(authContext).session.user;
export const useAuth = () => useContext(authContext).session;
const AuthProvider = ({
  session,
  children,
}: { session: SessionProps } & PropsWithChildren) => {
  return (
    <authContext.Provider value={{ session }}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
