"use server";
import prisma from "@/prisma/prisma";
import { QueryOptions } from "@/server/types";
import { unstable_noStore } from "next/cache";

export async function getUsers({ pageIndex, pageSize }: QueryOptions = {}) {
  unstable_noStore();
  pageIndex = pageIndex || 0;
  pageSize = pageSize || 20;
  const [total, data] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      take: pageSize,
      skip: pageSize * pageIndex,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { users: true, discountCodes: true, messages: true },
        },
      },
    }),
  ]);
  return {
    users: data,
    total,
    pageIndex,
    pageSize,
  };
}

export async function getUsersChart() {
  const data = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { createdAt: true },
  });
  return { data };
}
