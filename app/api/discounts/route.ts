import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import * as crypto from "crypto";

type ResponseData = {
  message: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const authorized =
    url.searchParams.get("api") ===
    (process.env.INTERNAL_API_KEY || crypto.randomBytes(32).toString("hex"));
  if (!authorized)
    return NextResponse.json(
      { message: "API token is missing or wrong." },
      { status: 401 },
    );

  const discounts = await prisma.discountCode.findMany({
    take: +(url.searchParams.get("take") || 100),
    skip: +(url.searchParams.get("skip") || 0),
    include: {
      user: {
        select: {
          id: true,
          phone: true,
          fullName: true,
          createdAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ discounts });
}
