"use server";
import prisma from "@/prisma/prisma";
import { QueryOptions } from "@/server/types";
import { unstable_noStore } from "next/cache";

export async function getAnswers({ pageIndex, pageSize }: QueryOptions = {}) {
  unstable_noStore();

  pageIndex = pageIndex || 0;
  pageSize = pageSize || 20;
  const [total, data] = await prisma.$transaction([
    prisma.answer.count(),
    prisma.answer.findMany({
      take: pageSize,
      skip: pageSize * pageIndex,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { fullName: true, phone: true },
        },
      },
    }),
  ]);
  return {
    answers: data,
    total,
    pageIndex,
    pageSize,
  };
}
