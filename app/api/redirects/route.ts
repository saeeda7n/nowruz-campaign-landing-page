import { redirect } from "next/navigation";
import { getSession } from "@/server/actions/auth";
import { NextRequest } from "next/server";
import prisma from "@/prisma/prisma";
import content from "@/data/landing/content.json";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const model = url.searchParams.get("m") as string;
  const id = url.searchParams.get("i") as string;
  if (!id || !model) redirect("/");
  const { user } = await getSession();
  let item;
  if (model === "specialOffers")
    item = content.special_offers.find((item) => id === item.id);

  if (!item || !item.attachedUrl) redirect("/");
  await prisma.clickRecords.create({
    data: {
      model,
      referenceId: id,
      userId: user?.id,
      geo: request.geo,
      id: request.ip,
    },
  });

  redirect(item.attachedUrl);
}
