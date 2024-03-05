"use client";
import React, { useState } from "react";
import Image from "next/image";
import Paper from "@/app/(landing)/questionChallenge/paper";
import questions from "@/data/landing/questions.json";
import { cn } from "@/lib/utils";
import { ChevronUp, Star } from "lucide-react";

type ID = number;
const days = [
  "اول",
  "دوم",
  "سوم",
  "چهارم",
  "پنجم",
  "ششم",
  "هفتم",
  "هشتم",
  "نهم",
  "دهم",
  "یازدهم",
  "دوازدهم",
  "سیزدهم",
];

type QuestionProps = {
  id: ID;
  question: string;
  correctOption: ID;
  answers: {
    id: ID;
    answer: string;
  }[];
};

type StartCardProps = {
  name: string;
  active?: boolean;
  stars?: number;
  passed?: boolean;
  suggested?: boolean;
  today?: boolean;
};
const StarCard = ({
  name,
  today,
  stars,
  suggested,
  passed,
  active,
}: StartCardProps) => {
  stars = stars || 0;
  return (
    <div
      className={cn(
        "text-brown relative flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#E9A56E] text-[#E9A56E]",
        {
          "border-none": passed,
          "cursor-pointer": !passed,
          "border-solid border-[#FFFEB1] text-[#FFFEB1]": today,
          "inner-shadow border-solid border-[#FFFEB1]": suggested,
          "opacity-50": !active,
        },
      )}
    >
      {suggested ? (
        <span className="text-4xl font-bold text-[#FFFEB1] [filter:drop-shadow(0_0_10px_currentColor)]">
          ?
        </span>
      ) : (
        <div className="-gap-3 flex items-end">
          <Star
            size={24}
            strokeWidth={stars > 1 ? 0 : 0.8}
            className="-me-2 [filter:drop-shadow(0_0_10px_currentColor)]"
            fill={stars > 1 ? "url(#MyGradient)" : "transparent"}
          />
          <Star
            size={38}
            strokeWidth={stars > 2 ? 0 : 0.8}
            strokeLinecap="round"
            fill={stars > 2 ? "url(#MyGradient)" : "transparent"}
            className="[filter:drop-shadow(0_0_10px_currentColor)]"
          />
          <Star
            size={24}
            strokeWidth={stars > 0 ? 0 : 0.8}
            className="-ms-2 [filter:drop-shadow(0_0_10px_currentColor)]"
            fill={stars > 0 ? "url(#MyGradient)" : "transparent"}
          />
        </div>
      )}
      <span className="text-brown text-xs font-semibold">روز {name}</span>
      {today && (
        <div className="absolute -bottom-3 left-0 right-0 flex items-center justify-center">
          <ChevronUp
            fill="#FFFEB1"
            className="scale-y-150 [filter:drop-shadow(0_0_5px_#FFFEB1)]"
          />
        </div>
      )}
    </div>
  );
};

const SelectDayPaper = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-2 pe-[12%]">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute opacity-0"
      >
        <defs>
          <linearGradient x1="0.258" y1="0.115" x2="0.5" y2="1" id="MyGradient">
            <stop offset="0" stopColor="#FFFEB1" />
            <stop offset="1" stopColor="#FFF" />
          </linearGradient>
        </defs>
      </svg>
      {new Array(13).fill(0).map((_, index) => (
        <StarCard
          key={index}
          name={days[index]}
          active={index <= 8}
          stars={index % 4}
          passed={index < 4}
          suggested={index === 4}
          today={index === 8}
        />
      ))}
    </div>
  );
};
const QuestionPaper = ({ questions }: { questions: QuestionProps[] }) => {
  return (
    <div className="text-brown flex flex-col gap-y-8">
      {questions.map((question) => (
        <div className="flex flex-col gap-y-4" key={question.id}>
          <p className="text-base font-bold">{question.question}</p>
          <div className="flex flex-col gap-3">
            {question.answers.map((answer) => (
              <div className="group flex items-center gap-2" key={answer.id}>
                <label className="flex flex-shrink-0">
                  <input type="checkbox" className="peer" hidden />
                  <span className="border-brown group-hover:bg-brown peer-checked:bg-brown size-5 rounded-full border-4 bg-transparent" />
                </label>
                <p className="text-sm font-medium">{answer.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
const Book = () => {
  const [test, setTest] = useState(false);
  return (
    <div
      className="relative -ms-24 flex flex-1 select-none md:ms-0"
      onClick={() => setTest((p) => !p)}
    >
      <div className="mx-auto flex w-[200%] max-w-[992px] items-center justify-start md:justify-center">
        <Image
          src="/landing/images/open-book.png"
          alt="Open book"
          width={1070}
          height={738}
          className="ms-auto  max-w-[992px] [filter:drop-shadow(0_23px_46px_#581C01)] md:w-auto"
        />
        <div className="absolute inset-0 flex">
          <div className="relative flex-1">
            <Paper
              index={2}
              front={<SelectDayPaper />}
              rear={
                <QuestionPaper questions={questions[0].questions.slice(2, 3)} />
              }
              back={test}
            />
            <Paper
              index={1}
              front={
                <QuestionPaper questions={questions[0].questions.slice(0, 2)} />
              }
            />
          </div>
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
};

export default Book;
