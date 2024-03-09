// import { webcrypto } from "crypto";
// globalThis.crypto = webcrypto as Crypto;
import { Cookie, Lucia, Session, TimeSpan, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "@/prisma/prisma";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

interface DatabaseUserAttributes {
  id: string;
  phone: string;
  refId: string;
  points: number;
  createdAt: string;
  updatedAt: string;
  cards: string[];
  vouchers: number;
  seenCards: string[];
}

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return attributes;
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export type SessionProps =
  | { user: User; session: Session }
  | { user: null; session: null };

export function luciaCookieToNextCookie(cookie: Cookie) {
  return {
    name: cookie.name,
    value: cookie.value,
    ...cookie.attributes,
  };
}
