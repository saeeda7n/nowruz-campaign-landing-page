"use server";
import prisma from "@/prisma/prisma";
import { QueryOptions } from "@/server/types";
import { unstable_noStore } from "next/cache";

export async function getRedirects({ pageIndex, pageSize }: QueryOptions = {}) {
  unstable_noStore();

  pageIndex = pageIndex || 0;
  pageSize = pageSize || 20;
  const [total, data] = await prisma.$transaction([
    prisma.clickRecords.count(),
    prisma.clickRecords.findMany({
      take: pageSize,
      skip: pageSize * pageIndex,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { phone: true, id: true, fullName: true } },
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

export async function getRedirectsChart() {
  const data = await prisma.clickRecords.findMany({
    orderBy: { createdAt: "asc" },
    select: { createdAt: true, referenceId: true },
  });
  return { data };
}
