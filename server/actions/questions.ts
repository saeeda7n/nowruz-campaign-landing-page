"use server";
import { differenceInDays } from "date-fns";
import questions from "@/data/landing/questions.json";
import { START } from "@/lib/consts";

export async function getQuestion(id?: string) {
  return questions.find((question) => question.id === id);
}

export async function getQuestionGameData() {
  const today = getCurrentDay();
  const activeQuestionIds = questions.slice(0, today).map(({ id }) => id);
  return {
    today,
    activeQuestionIds,
    currentDayId: activeQuestionIds.at(-1),
    totalQuestions: questions.length,
  };
}

function getCurrentDay() {
  return differenceInDays(Date.now(), START);
}

function correction(dayId: string, answers: any) {}

function Sleep() {
  return new Promise((resolve) => setTimeout(resolve, 4000));
}
