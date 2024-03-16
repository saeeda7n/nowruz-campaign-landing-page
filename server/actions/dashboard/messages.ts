"use server";
import prisma from "@/prisma/prisma";
import { QueryOptions } from "@/server/types";
import { unstable_noStore } from "next/cache";

export async function getMessages({ pageIndex, pageSize }: QueryOptions = {}) {
  unstable_noStore();

  pageIndex = pageIndex || 0;
  pageSize = pageSize || 20;
  const [total, data] = await prisma.$transaction([
    prisma.textMessages.count(),
    prisma.textMessages.findMany({
      take: pageSize,
      skip: pageSize * pageIndex,
      orderBy: { createdAt: "desc" },
      include: {
        receiver: { select: { phone: true, id: true, fullName: true } },
      },
    }),
  ]);
  return {
    messages: data,
    total,
    pageIndex,
    pageSize,
  };
}

export async function getMessagesChart() {
  const data = await prisma.textMessages.findMany({
    orderBy: { createdAt: "asc" },
    select: { createdAt: true },
  });
  return { data };
}
