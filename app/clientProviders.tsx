"use client";
import React, { PropsWithChildren, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const ClientProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ClientProviders;
