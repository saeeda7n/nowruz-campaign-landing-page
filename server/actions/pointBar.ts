"use server";
import prisma from "@/prisma/prisma";
import { getSession } from "@/server/actions/auth";
import { revalidatePath } from "next/cache";

export async function seenCard(id: string) {
  const { user } = await getSession();
  if (!user) return { status: false, message: "لطفاً ابتدا وارد شوید!" };
  user.seenCards.includes(id) || user.seenCards.push(id);
  const { seenCards } = await prisma.user.update({
    where: { id: user.id },
    data: {
      seenCards: { set: user.seenCards },
    },
  });
  revalidatePath("/");
  return seenCards;
}
