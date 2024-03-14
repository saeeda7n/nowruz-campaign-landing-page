"use server";

import prisma from "@/prisma/prisma";

export async function getDashboardData() {
  const [
    textMessagesCount,
    usersCount,
    discountCodeCount,
    answersCount,
    latestUsers,
    latestTextMessages,
    latestDiscountCodes,
  ] = await Promise.all([
    prisma.textMessages.count(),
    prisma.user.count(),
    prisma.discountCode.count(),
    prisma.answer.count(),
    prisma.user.findMany({
      select: { id: true, phone: true, fullName: true, createdAt: true },
      take: 7,
      orderBy: { createdAt: "desc" },
    }),
    prisma.textMessages.findMany({
      include: { receiver: { select: { phone: true, fullName: true } } },
      take: 7,
      orderBy: { createdAt: "desc" },
    }),
    prisma.discountCode.findMany({
      include: { user: { select: { fullName: true } } },
      take: 7,
      orderBy: { createdAt: "desc" },
    }),
  ]);
  return {
    textMessagesCount,
    usersCount,
    discountCodeCount,
    answersCount,
    latestUsers,
    latestTextMessages,
    latestDiscountCodes,
  };
}
