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
    currentDayId: activeQuestionIds[today - 1] || "",
    totalQuestions: questions.length,
  };
}

function getCurrentDay() {
  return differenceInDays(Date.now(), startOfDay(subDays(START, 1)));
}

export async function submitAnswer(data: FormData) {
  const points = { 0: 0, 1: 0, 2: 5, 3: 10 };
  const { user } = await getSession();
  if (!user) return { status: false, message: "لطفا ابتدا وارد شوید." };
  const day = questions.find(({ id }) => id === data.get("dayId"));
  if (!day) return { status: false };
  console.log(+day.order === getCurrentDay(), day.order, getCurrentDay());
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
    let accumulator: 0 | 1 | 2 | 3 = 0;
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
    await prisma.$transaction(async (tx) => {
      await tx.answer.create({
        data: {
          stars: accumulator,
          userId: user.id,
          dayId: day.id,
          answers: submittedAnswers,
        },
      });
      const card =
        +day.order === getCurrentDay()
          ? accumulator > 2
            ? "1000"
            : (accumulator > 1 && "100") || "0"
          : "0";
      await tx.user.update({
        where: { id: user.id },
        data: {
          cards: { push: card },
          vouchers: {
            increment:
              +day.order === getCurrentDay() ? points[accumulator] || 0 : 0,
          },
          points: {
            increment: accumulator * 10,
          },
        },
      });
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
  const answers = await prisma.answer.findMany({ where: { userId: user.id } });
  const lastAnswered =
    questions
      .filter((day, index) => answers.find((answer) => answer.dayId === day.id))
      .sort((a, b) => (+a.order > +b.order ? 1 : -1))
      .at(-1)?.order || 0;
  const suggested = questions.at(+lastAnswered);
  return {
    suggestedId: suggested?.id,
    suggestedIndex: +(suggested?.order || "0"),
    answers: answers.map(
      ({ userId, answers, id, createdAt, ...answer }) => answer,
    ),
  };
}
