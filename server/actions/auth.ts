"use server";
import prisma from "@/prisma/prisma";
import { authSchema } from "@/schemas/authSchemas";
import { lucia, luciaCookieToNextCookie, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";

export async function getAuthOtp(phone: string) {
  const session = await validateRequest();
  if (session.user)
    return { status: false, message: "شما قبلا وارد حساب خود شده اید!" };
  const result = await authSchema.safeParseAsync({ phone });
  if (!result.success) {
    return {
      status: false,
      message: "لطفا اطلاعات را به درستی وارد کنید",
      errors: result.error.errors,
    };
  }
  const code = String(getRandomInt(100_000, 999_999));
  try {
    await prisma.$transaction(
      async (tx) => {
        await tx.user.upsert({
          where: { phone },
          create: { phone, otps: { create: { code } } },
          update: {
            otps: { create: { code } },
          },
          include: {
            otps: { where: { used: false } },
          },
        });
      },
      { timeout: 10_000 },
    );

    //todo: send sms

    return { message: "کد تایید برای شما ارسال شد.", status: true };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: "خطایی رخ داده است! لطفا دوباره تلاش کنید.",
    };
  }
}

export async function authLogin(phone: string, code: string) {
  try {
    const user = await prisma.user.update({
      where: { phone, otps: { some: { code, used: false } } },
      data: {
        otps: {
          updateMany: {
            where: { code },
            data: { used: true },
          },
        },
      },
    });
    const session = await lucia.createSession(user.id, {});
    const cookie = lucia.createSessionCookie(session.id);
    cookies().set(luciaCookieToNextCookie(cookie));
    return { status: true, message: "شما با موفقیت وارد حسابتان شدید!" };
  } catch (e) {
    return { status: false, message: "کد وارد شده صحیح نمیباشد!" };
  }
}

export async function signOut() {
  const { session } = await validateRequest();
  if (!session) return { status: false, message: "کاربری یافت نشد!" };
  await lucia.invalidateSession(session.id);
  cookies().set(luciaCookieToNextCookie(lucia.createBlankSessionCookie()));
  return { status: true, message: "با موفقیت از حسابتان خارج شدید." };
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
