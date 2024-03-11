"use server";
import { POINTS } from "@/lib/consts";
import * as crypto from "crypto";
import { getSession } from "@/server/actions/auth";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function rollWheel() {
  const point = POINTS[getRandomInt(0, POINTS.length - 1)];
  const { user } = await getSession();
  if (!user)
    return { status: false, message: "لطفا برای ادامه ابتدا وارد شوید" };
  if (user.points < 100)
    return {
      status: false,
      message:
        "امتیاز شما کافی نیست! شما میتوانید با پاسخ به سوالات روزانه و یا دعوت از دوستان خود امتیاز خود را افزایش دهید.",
    };
  try {
    const discountCode = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id, points: { gte: 100 } },
        data: { points: { decrement: 100 } },
      });
      const discountCode = await tx.discountCode.create({
        data: {
          value: point,
          code: crypto.randomBytes(4).toString("hex"),
          userId: user.id,
        },
      });
      //todo send sms
      return discountCode;
    });
    revalidatePath("/");
    return {
      status: true,
      message: "کد تخفیف با موفقیت ایجاد شد",
      data: discountCode,
    };
  } catch (e) {
    return {
      status: false,
      message: "خطایی رخ داده است! لطفا مجددا تلاش کنید.",
    };
  }
}

export async function invitedUsers() {
  const { user } = await getSession();
  if (!user) return 0;
  const invited = await prisma.user.findUnique({
    where: { id: user.id },
    select: { _count: { select: { users: true } } },
  });
  return invited?._count.users || 0;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
