"use client";
import { useSearchParams } from "next/navigation";

const UserRef = () => {
  if (typeof window === "undefined") return null;
  const ref = useSearchParams().get("ref");
  if (ref) localStorage.setItem("ref", ref);
  return null;
};

export default UserRef;
