"use server";
import { differenceInDays, startOfDay, subDays } from "date-fns";
import questions from "@/data/landing/questions.json";
import { START } from "@/lib/consts";
import prisma from "@/prisma/prisma";
import { getSession } from "@/server/actions/auth";
import { revalidatePath } from "next/cache";

export async function getQuestion(id?: string) {
  return questions.find((question) => question.id === id);
}

export async function serverTime() {
  return Date.now();
}

export async function getQuestionGameData() {
  const today = getCurrentDay();
  const activeQuestionIds = questions.slice(0, today).map(({ id }) => id);
  return {
    now: Date.now(),
    today,
    activeQuestionIds,
    allQuestionIds: questions.map(({ id }) => id),
    currentDayId: activeQuestionIds.at(-1) || "",
    totalQuestions: questions.length,
  };
}

function getCurrentDay() {
  return differenceInDays(Date.now(), startOfDay(subDays(START, 1)));
}

export async function submitAnswer(data: FormData) {
  const { user } = await getSession();
  if (!user) return { status: false, message: "لطفا ابتدا وارد شوید." };
  const day = questions.find(({ id }) => id === data.get("dayId"));
  if (!day) return { status: false };
  const participatedBefore = await prisma.answer.findFirst({
    where: { userId: user.id, dayId: day.id },
  });
  if (participatedBefore)
    return {
      status: false,
      message: "شما قبلا به سوالات این روز پاسخ داده اید!",
    };
  const answers = day.questions.map(({ id, correctOption }) => ({
    questionId: id,
    correctOption,
  }));

  try {
    let accumulator = 0;
    let submittedAnswers: string[] = [];
    for (const answer of answers) {
      let isCorrect = false;
      if (data.get(`${answer.questionId}`) === answer.correctOption) {
        isCorrect = true;
        accumulator++;
      }
      submittedAnswers.push(
        `${answer.questionId},${String(data.get(answer.questionId))},${String(isCorrect)}`,
      );
    }
    await prisma.answer.create({
      data: {
        stars: accumulator,
        userId: user.id,
        dayId: day.id,
        answers: submittedAnswers,
      },
    });
    revalidatePath("/");
    return {
      status: true,
      message: `پاسخ شما ثبت شد, شما ${accumulator} پاسخ صحیح داده اید`,
    };
  } catch (e) {
    return {
      status: false,
      message:
        "خطایی رخ داده است! لطفاً مجددا تلاش کنید, در صورت تکرار این خطا با پشتیبانی تماس حاصل کنید.",
    };
  }
}

export async function getUserStatus() {
  const { user } = await getSession();
  if (!user) return null;
  const currentDay = getCurrentDay();
  const answers = await prisma.answer.findMany({ where: { userId: user.id } });
  const suggestedId = questions.filter((day, index) => {
    const answer = answers.find(({ dayId }) => dayId === day.id);
  });
  return {
    answers: answers.map(
      ({ userId, answers, id, createdAt, ...answer }) => answer,
    ),
  };
}
