"use client";
import React, { createContext, LegacyRef, useRef, useState } from "react";
import Image from "next/image";
import Paper from "@/app/(landing)/questionChallenge/paper";
import questions from "@/data/landing/questions.json";
import { cn } from "@/lib/utils";
import { ChevronUp, Star } from "lucide-react";
import { useBook } from "@/app/(landing)/questionChallenge/bookContext";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

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
        "relative flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#E9A56E] text-[#E9A56E] text-brown",
        {
          "border-none": passed,
          "cursor-pointer": !passed,
          "border-solid border-[var(--white-gold)] text-[var(--white-gold)]":
            today,
          "inner-shadow border-solid border-[var(--white-gold)]": suggested,
          "opacity-50": !active,
        },
      )}
    >
      {suggested ? (
        <span className="text-4xl font-bold text-[var(--white-gold)] [filter:drop-shadow(0_0_10px_currentColor)]">
          ?
        </span>
      ) : (
        <div className="-gap-3 flex items-end text-[#E9A56E]">
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

const SelectDayPaper = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-2 pe-[12%]">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute opacity-0"
      >
        <defs>
          <linearGradient
            x1="0.258"
            y1="0.115"
            x2="0.5"
            y2="1"
            id="goldGradient"
          >
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
    <div className="flex flex-col gap-y-8 text-brown">
      {questions.map((question) => (
        <div className="flex flex-col gap-y-4" key={question.id}>
          <p className="text-base font-bold">{question.question}</p>
          <div className="flex flex-col gap-3">
            {question.answers.map((answer) => (
              <div className="group flex items-center gap-2" key={answer.id}>
                <label className="flex flex-shrink-0">
                  <input
                    type="checkbox"
                    className="peer"
                    hidden
                    name={`q-${question.id}`}
                  />
                  <span className="size-5 rounded-full border-4 border-brown bg-transparent group-hover:bg-brown peer-checked:bg-white" />
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

function SpecialRewardSliderCard() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-5">
      <div className="relative">
        <div className="absolute -bottom-4 -start-4 flex size-12 items-center justify-center rounded-full bg-[#BC541B]">
          <span className="mt-1 text-xl font-semibold text-[--white-gold] [filter:drop-shadow(1px_1px_0_var(--gold))]">
            16%
          </span>
        </div>
        <img src="/images/iphone-13_2.png" className="max-h-32 w-auto" alt="" />
      </div>
      <p className="line-clamp-2 text-sm font-bold">Iphone 13 Pro Max</p>
    </div>
  );
}

function NextButton({
  disabled,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { disabled: boolean }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "pointer-events-auto size-10",
        { "-scale-x-100": disabled },
        props.className,
      )}
    >
      <img
        draggable={false}
        alt="Action icon"
        src={disabled ? "/icons/next.svg" : "/icons/next-enable.svg"}
      />
    </button>
  );
}

function PrevButton({
  disabled,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { disabled: boolean }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "pointer-events-auto size-10",
        { "-scale-x-100": !disabled },
        props.className,
      )}
    >
      <img
        draggable={false}
        alt="Action icon"
        src={disabled ? "/icons/next.svg" : "/icons/next-enable.svg"}
      />
    </button>
  );
}

function SpecialRewards() {
  const swiper = useRef<SwiperRef>(null);
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  return (
    <div className="ms-[3%] flex max-w-96 flex-1 items-center justify-center">
      <div className="relative -mt-[16%] max-w-[22rem]">
        <Image
          src="/images/pirate-paper.png"
          alt="Pirate paper"
          width={385}
          draggable={false}
          height={420}
          className="w-auto"
        />
        <div className="absolute inset-0 flex">
          <div className="relative flex flex-1 items-center justify-start">
            <div className="relative flex w-full  justify-center overflow-hidden">
              <div className="mb-[16%] flex w-[60%] max-w-72 flex-col gap-y-2 text-brown">
                <div className="space-y-1 text-center">
                  <h4 className="text-xl font-bold">جوایز ویژه برای شما</h4>
                  <p className="text-[0.6rem] font-bold">
                    بعد از 13روز شما قادر به دریافت جوایز خود هستید
                  </p>
                </div>
                <Swiper
                  ref={swiper}
                  slidesPerView={1}
                  className="relative w-full"
                  onSlideChange={setActionButtons}
                  onInit={setActionButtons}
                >
                  <SwiperSlide>
                    <SpecialRewardSliderCard />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SpecialRewardSliderCard />
                  </SwiperSlide>
                  <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-between pb-[15%] ">
                    <NextButton onClick={prev} disabled={!canPrev} />
                    <PrevButton onClick={next} disabled={!canNext} />
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function setActionButtons(swiper: any) {
    setCanNext(swiper.activeIndex < swiper.slides.length - 1);
    setCanPrev(swiper.activeIndex > 0);
  }

  function next() {
    swiper.current?.swiper.slideNext();
  }

  function prev() {
    swiper.current?.swiper.slidePrev();
  }
}

const Book = () => {
  const { setPage } = useBook();
  return (
    <div className="relative -ms-24 flex flex-1 select-none md:ms-0">
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
              index={2}
              front={<SelectDayPaper />}
              rear={
                <QuestionPaper questions={questions[0].questions.slice(2, 3)} />
              }
            />
            <Paper
              index={1}
              front={
                <QuestionPaper questions={questions[0].questions.slice(0, 2)} />
              }
            />
          </form>
          <div className="flex flex-1">
            <SpecialRewards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
