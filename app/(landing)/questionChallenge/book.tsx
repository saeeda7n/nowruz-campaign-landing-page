"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import Paper from "@/app/(landing)/questionChallenge/paper";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  MoveLeft,
  MoveRight,
  Send,
  SendHorizonal,
  Star,
} from "lucide-react";
import { useBook } from "@/app/(landing)/questionChallenge/bookContext";
import content from "@/data/landing/content.json";
import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "@/server/actions/questions";
import BookSlider from "@/app/(landing)/questionChallenge/bookSlider";

const SelectDayPaper = () => {
  const { setQuestion, gameData } = useBook();
  const [id, setId] = useState("");

  const question = useQuery({
    enabled: false,
    queryKey: ["qs"],
    queryFn: (context) => getQuestion(id),
  });

  useEffect(() => {
    if (id) question.refetch();
  }, [id]);

  useEffect(() => {
    if (question.data) setQuestion(question.data);
  }, [question.data]);

  return (
    <div className="mb-auto grid w-full grid-cols-3 gap-2 pe-[12%]">
      <StarsGradient />
      {new Array(gameData?.totalQuestions).fill(0).map((_, index) => (
        <StarCard
          key={index}
          onClick={() => setId(gameData?.activeQuestionIds[index] || "")}
          name={content.days[index]}
          active={index < (gameData?.today || 0)} //activated or not
          today={gameData?.activeQuestionIds[index] === gameData?.currentDayId} //the current and last day
          stars={0} //user stars earned
          passed={false} //user answered this
          suggested={false} //first day not answered yet
        />
      ))}
    </div>
  );
};

const QuestionPaper = ({
  questions,
  children,
}: { questions: QuestionProps[] } & PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-y-8 text-brown">
      {questions.map((question) => (
        <div className="flex flex-col gap-y-4" key={question.id}>
          <p className="text-sm font-bold sm:text-base">{question.question}</p>
          <div className="flex flex-col gap-3">
            {question.answers.map((answer) => (
              <div className="group flex items-center gap-2" key={answer.id}>
                <label className="flex flex-shrink-0">
                  <input
                    type="radio"
                    className="peer"
                    hidden
                    name={`q-${question.id}`}
                  />
                  <span className="size-5 rounded-full border-4 border-brown bg-transparent peer-checked:bg-white" />
                </label>
                <p className="text-sm font-medium">{answer.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {children}
    </div>
  );
};

const Book = () => {
  const { setPage, page, singlePage, question } = useBook();
  return (
    <div className="relative -ms-24 flex flex-1 select-none lg:ms-0">
      <div className="mx-auto flex w-[200%] max-w-[992px] items-center justify-start md:justify-center">
        <Image
          src="/landing/images/open-book.png"
          alt="Open book"
          width={1070}
          height={738}
          className="ms-auto  max-w-[992px] [filter:drop-shadow(0_23px_46px_#581C01)] md:w-auto"
        />
        <div className="absolute inset-0 flex">
          <form className="relative flex-1">
            <Paper
              show={[0, 1].includes(page)}
              back={page > 0}
              page={3}
              front={<SelectDayPaper />}
              rear={
                question &&
                !singlePage && (
                  <QuestionPaper questions={question.questions.slice(2, 3)}>
                    <div className="absolute bottom-[1%] left-0 right-0 flex items-center justify-center">
                      <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[--lighter-brown] px-8 font-bold text-gray-50 [box-shadow:0_4px_0_0_var(--brown)]">
                        <Send className="fill-gray-50" />
                        ثبت جواب ها
                      </button>
                    </div>
                  </QuestionPaper>
                )
              }
            />
            <Paper
              show={[1, 2].includes(page)}
              page={2}
              back={page > 1}
              front={
                question && (
                  <QuestionPaper questions={question.questions.slice(0, 2)}>
                    <div className="absolute bottom-[1%] left-0 right-0 flex items-center justify-center gap-2">
                      {singlePage && (
                        <button
                          type="button"
                          onClick={() => setPage(2)}
                          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[--lighter-brown] px-8 font-bold text-gray-50 [box-shadow:0_4px_0_0_var(--brown)]"
                        >
                          <MoveRight className="fill-gray-50" />
                          صفحه بعدی
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setPage(0)}
                        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[--lighter-brown] px-8 font-bold text-gray-50 [box-shadow:0_4px_0_0_var(--brown)]"
                      >
                        بازگشت
                        <MoveLeft className="fill-gray-50" />
                      </button>
                    </div>
                  </QuestionPaper>
                )
              }
            />
            <Paper
              show={[2, 3].includes(page)}
              page={1}
              back={page > 2}
              front={
                question && (
                  <QuestionPaper questions={question.questions.slice(2, 3)}>
                    <div className="absolute bottom-[1%] left-0 right-0 flex items-center justify-center gap-2">
                      <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[--lighter-brown] px-8 font-bold text-gray-50 [box-shadow:0_4px_0_0_var(--brown)]">
                        <SendHorizonal className="fill-gray-50" />
                        ثبت جواب ها
                      </button>
                      <button
                        type="button"
                        onClick={() => setPage(1)}
                        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[--lighter-brown] px-8 font-bold text-gray-50 [box-shadow:0_4px_0_0_var(--brown)]"
                      >
                        بازگشت
                        <MoveLeft className="fill-gray-50" />
                      </button>
                    </div>
                  </QuestionPaper>
                )
              }
            />
          </form>
          <div className="flex flex-1">
            <BookSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;

const StarCard = ({
  name,
  today,
  stars,
  suggested,
  passed,
  active,
  ...props
}: StartCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  stars = stars || 0;
  return (
    <div
      {...props}
      className={cn(
        "relative flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#E9A56E] text-[#E9A56E]",
        {
          "border-none": passed,
          "cursor-pointer": !passed && active,
          "border-solid border-[var(--white-gold)] text-[var(--white-gold)]":
            today && !passed,
          "inner-shadow border-solid border-[var(--white-gold)]":
            suggested && active && !passed,
          "cursor-default opacity-50": !active,
        },
      )}
    >
      {suggested ? (
        <span className="text-4xl font-bold text-[var(--white-gold)] [filter:drop-shadow(0_0_10px_currentColor)]">
          ?
        </span>
      ) : (
        <div className="-gap-3 flex items-end">
          <Star
            size={24}
            strokeWidth={stars > 1 ? 0 : 0.8}
            className="-me-2 [filter:drop-shadow(0_0_10px_var(--white-gold))]"
            fill={stars > 1 ? "url(#goldGradient)" : "transparent"}
          />
          <Star
            size={38}
            strokeWidth={stars > 2 ? 0 : 0.6}
            strokeLinecap="round"
            fill={stars > 2 ? "url(#goldGradient)" : "transparent"}
            className="[filter:drop-shadow(0_0_10px_var(--white-gold))]"
          />
          <Star
            size={24}
            strokeWidth={stars > 0 ? 0 : 0.8}
            className="-ms-2 [filter:drop-shadow(0_0_10px_var(--white-gold))]"
            fill={stars > 0 ? "url(#goldGradient)" : "transparent"}
          />
        </div>
      )}
      <span className="text-xs font-semibold text-brown">روز {name}</span>
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

function StarsGradient() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute opacity-0"
    >
      <defs>
        <linearGradient x1="0.258" y1="0.115" x2="0.5" y2="1" id="goldGradient">
          <stop offset="0" stopColor="#FFFEB1" />
          <stop offset="1" stopColor="#FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type ID = string;
type QuestionProps = {
  id: ID;
  question: string;
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
