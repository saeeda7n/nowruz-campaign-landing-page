"use server";
import questions from "@/data/landing/questions.json";

export async function getQuestionsLength() {
  return questions.length;
}

export async function getUnlockedQuestions() {
  const theDay = 3;
  return questions
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .slice(0, theDay);
}
