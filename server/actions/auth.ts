"use server";
import prisma from "@/prisma/prisma";
import { authSchema } from "@/schemas/authSchemas";
import { lucia, luciaCookieToNextCookie, SessionProps } from "@/lib/auth";
import { cookies } from "next/headers";
import { subMinutes } from "date-fns";

export async function getAuthOtp(phone: string) {
  const session = await getSession();
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
          create: {
            refId: Date.now().toString(36).replace("0.", ""),
            phone,
            otps: { create: { code } },
          },
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

    return { message: "کد ورود یک بار مصرف برای شمار ارسال شد.", status: true };
  } catch (e) {
    return {
      status: false,
      message: "خطایی رخ داده است! لطفا دوباره تلاش کنید.",
      error: e,
    };
  }
}

export async function authLogin(phone: string, code: string) {
  try {
    const user = await prisma.user.update({
      where: {
        phone,
        otps: {
          some: {
            code,
            used: false,
            createdAt: { gte: subMinutes(Date.now(), 10) },
          },
        },
      },
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
    return { status: true, message: "با موفقیت وارد حسابتان شدید!" };
  } catch (e) {
    return { status: false, message: "کد وارد شده صحیح نمیباشد!" };
  }
}

export async function authSignOut() {
  const { session } = await getSession();
  if (!session) return { status: false, message: "کاربری یافت نشد!" };
  await lucia.invalidateSession(session.id);
  cookies().set(luciaCookieToNextCookie(lucia.createBlankSessionCookie()));
  return { status: true, message: "با موفقیت از حسابتان خارج شدید." };
}

export async function getSession(): Promise<SessionProps> {
  try {
    const sessionId = lucia.readSessionCookie(cookies().toString());
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }
    const result = await lucia.validateSession(sessionId);
    if (result.session && result.session.fresh) {
      const cookie = lucia.createSessionCookie(result.session.id);
      cookies().set(luciaCookieToNextCookie(cookie));
    }
    if (!result.session) {
      const cookie = lucia.createBlankSessionCookie();
      cookies().set(luciaCookieToNextCookie(cookie));
    }
    return result;
  } catch (e) {
    return {
      user: null,
      session: null,
    };
  }
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
