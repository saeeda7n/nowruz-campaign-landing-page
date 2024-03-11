"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import Paper from "@/app/(landing)/questionChallenge/paper";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  Loader,
  MoveLeft,
  MoveRight,
  Send,
  SendHorizonal,
  Star,
} from "lucide-react";
import { useBook } from "@/app/(landing)/questionChallenge/bookContext";
import content from "@/data/landing/content.json";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getQuestion,
  getUserStatus,
  submitAnswer,
} from "@/server/actions/questions";
import BookSlider from "@/app/(landing)/questionChallenge/bookSlider";
import { useUser } from "@/authProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

const SelectDayPaper = () => {
  const user = useUser();
  const router = useRouter();
  const { setQuestion, page, gameData, userState } = useBook();
  const [id, setId] = useState("");

  const question = useQuery({
    enabled: false,
    queryKey: ["qs"],
    queryFn: () => getQuestion(id),
  });

  useEffect(() => {
    if (page === 0) setId("");
  }, [page]);

  useEffect(() => {
    if (id) question.refetch();
  }, [id]);

  useEffect(() => {
    if (question.data) setQuestion(question.data);
  }, [question.data, id]);

  return (
    <>
      {question.isFetching && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-20 items-center justify-center  rounded-3xl bg-brown text-gray-50 opacity-50">
            <Loader className="animate-spin" />
          </div>
        </div>
      )}
      <div className="relative mb-auto grid w-full grid-cols-3 gap-2 pe-[12%]">
        <StarsGradient />
        {gameData?.allQuestionIds.map((id, index) => (
          <StarCard
            key={id}
            onClick={() => {
              if (!user) {
                router.push("/auth");
                return;
              }
              if (
                userState?.suggestedIndex > index &&
                gameData?.today > index
              ) {
                setId(id);
              }
            }}
            name={content.days[index]}
            active={
              userState?.suggestedIndex > index && gameData?.today > index
            } //activated or not
            today={id === gameData?.currentDayId} //the current and last day
            disabled={index >= gameData?.today}
            stars={
              userState?.answers.find((answer: any) => answer.dayId === id)
                ?.stars || 0
            } //user stars earned
            passed={
              !!userState?.answers.find((answer: any) => answer.dayId === id)
            } //user answered this
            suggested={userState?.suggestedId === id && gameData?.today > index} //first day not answered yet
          />
        ))}
      </div>
    </>
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
                    name={`${question.id}`}
                    value={answer.id}
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

function ResultDialog({
  result,
  ...props
}: DialogProps & {
  result: { card: string; points: number; stars: number };
}) {
  return (
    <Dialog {...props}>
      <DialogContent>
        {result && (
          <div className="flex flex-col gap-8 pb-6 pt-4 text-center text-brown">
            <div className="mb-4 flex items-end justify-center">
              <img
                className="-mb-3 w-20 first:-me-7 last:-ms-7"
                src={
                  result.stars > 1
                    ? "/icons/star-filled.svg"
                    : "/icons/star.svg"
                }
              />
              <img
                className="z-50 w-28 first:-me-7 last:-ms-7"
                src={
                  result.stars > 2
                    ? "/icons/star-filled.svg"
                    : "/icons/star.svg"
                }
              />
              <img
                className="-mb-3 w-20 first:-me-7 last:-ms-7"
                src={
                  result.stars > 0
                    ? "/icons/star-filled.svg"
                    : "/icons/star.svg"
                }
              />
            </div>
            <p className="text-2xl font-black sm:text-3xl">
              شما {result.stars} پاسخ صحیح داده اید
            </p>
            <div className="flex items-end justify-around gap-5">
              <div className="max-w-36 space-y-2">
                <div className="text-3xl font-black sm:text-5xl">
                  {result.points}
                </div>
                <p className="text-xs font-bold sm:text-sm">
                  امتیاز بدست آمده برای گردانه شانس
                </p>
              </div>
              <div className="max-w-36 space-y-2 text-xs font-medium">
                {result.card === "1000" && (
                  <img
                    src="/landing/images/gold.webp"
                    className="mx-auto h-12 w-auto sm:h-16"
                    alt=""
                  />
                )}
                {result.card === "100" && (
                  <img
                    src="/landing/images/silver.webp"
                    className="mx-auto h-12 w-auto sm:h-16"
                    alt=""
                  />
                )}
                {["1000", "100"].includes(result.card) ? (
                  <p className="text-xs font-bold sm:text-sm">
                    شما یک کارت {result.card} آفرین بدست آوردید.
                  </p>
                ) : (
                  <p className="text-xs font-bold sm:text-sm">
                    شما تنها با پاسخ دادن به سوالات مربوط به همان روز میتوانید
                    کارت های 100 و 1000 آفرید بدست آورید.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

const Book = () => {
  const { setPage, page, singlePage, question } = useBook();
  const submit = useMutation({
    mutationFn: (data: FormData) => submitAnswer(data),
  });
  const [dialog, setDialog] = useState(false);
  const [result, setResult] = useState<any>(null);

  return (
    <div className="relative -ms-24 flex flex-1 select-none lg:ms-0">
      <div className="mx-auto flex w-[200%] max-w-[955px] items-center justify-start md:justify-center">
        <Image
          src="/landing/images/open-book.png"
          alt="Open book"
          width={1070}
          height={738}
          className="ms-auto max-w-[955px] [filter:drop-shadow(0_23px_46px_#581C01)] md:w-auto"
        />
        <ResultDialog onOpenChange={setDialog} open={dialog} result={result} />
        <div className="absolute inset-0 flex">
          <form className="relative flex-1" onSubmit={onSubmit}>
            <input hidden name="dayId" value={question?.id} />
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
                        {submit.isPending ? (
                          <Loader className="animate-spin fill-gray-50" />
                        ) : (
                          <Send className="fill-gray-50" />
                        )}
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
                        {submit.isPending ? (
                          <Loader className="animate-spin fill-gray-50" />
                        ) : (
                          <Send className="fill-gray-50" />
                        )}
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

  function onSubmit(e: any) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    submit.mutate(data, {
      onError: () => toast.error("خطلایی رخ داده است! لطفا مجددا تلاش کنید."),
      onSuccess(data) {
        toast[data?.status ? "success" : "error"](data?.message);
        if (data?.status) {
          setPage(0);
          setResult(data.earnedRewards);
          setDialog(true);
        }
      },
    });
  }
};

export default Book;

const StarCard = ({
  name,
  today,
  stars,
  suggested,
  passed,
  active,
  disabled,
  ...props
}: StartCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  stars = stars || 0;
  return (
    <div
      {...props}
      className={cn(
        "relative flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#E9A56E] text-[#E9A56E]",
        {
          "pointer-events-none border-none": passed,
          "cursor-pointer": !passed && active,
          "border-solid border-[var(--white-gold)] text-[var(--white-gold)]":
            today && !passed,
          "inner-shadow border-solid border-[var(--white-gold)]":
            suggested && active && !passed,
          "cursor-default": !active,
          "opacity-50": disabled,
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
      {today && !passed && (
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
  disabled?: boolean;
};
