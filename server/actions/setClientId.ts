"use server";
import { cookies } from "next/headers";

export async function setClientId() {
  const cookie = cookies().get("clientId");
  if (!cookie?.value) {
    cookies().set({
      name: "clientId",
      value: crypto.randomUUID(),
      httpOnly: false,
    });
  }
  return null;
}
