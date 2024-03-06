import React from "react";
import Image from "next/image";
import content from "@/data/landing/content.json";
import Book from "@/app/(landing)/questionChallenge/book";
import BookContext from "@/app/(landing)/questionChallenge/bookContext";
import {
  getQuestionsLength,
  getUnlockedQuestions,
} from "@/server/actions/questions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type GameGuidelineTicketHelpProps = {
  title: string;
  description: string;
  image: string;
};
type GameGuidelineHelpCardProps = {
  title: string;
  body: string;
};

function FloatingGiftBoxes() {
  return (
    <>
      <Image
        draggable={false}
        src="/landing/images/gift-box-1.webp"
        alt="Floating gift box"
        width={190}
        height={180}
        className="absolute -end-8 -top-32 z-10 scale-75 -scale-x-75 sm:scale-100 sm:-scale-x-100  md:-top-52 md:end-12"
      />
      <Image
        draggable={false}
        src="/landing/images/gift-box-2.webp"
        alt="Floating gift box"
        height={140}
        width={140}
        className="absolute -start-10 -top-16 -scale-x-100 sm:start-1/3 2xl:start-[550px] 2xl:top-2 2xl:z-10"
      />
      <Image
        draggable={false}
        src="/landing/images/gift-box-3.webp"
        alt="Floating gift box"
        width={170}
        height={175}
        className="absolute -start-8 -top-32 z-10 hidden sm:block "
      />
      <Image
        draggable={false}
        src="/landing/images/gift-box-4.webp"
        alt="Floating gift box"
        width={138}
        height={142}
        className="absolute -end-6 bottom-12 z-10 rotate-[16deg]"
      />
    </>
  );
}

function GameGuidelineTickedHelp({
  title,
  description,
  image,
}: GameGuidelineTicketHelpProps) {
  return (
    <div className="flex min-h-[5.5rem] w-full items-center gap-2 rounded-[3rem] bg-[#e9a56e]/50 p-3 pe-6 sm:gap-4 sm:p-2">
      <div className="flex size-16 flex-shrink-0 items-center justify-center self-start rounded-full bg-black px-1 sm:size-20">
        <Image
          src={image}
          alt={title}
          className="h-auto w-14 sm:w-auto"
          width={60}
          height={48}
        />
      </div>
      <div className="space-y-1 sm:space-y-2">
        <h4 className="text-lg font-semibold sm:text-xl lg:text-2xl">
          {title}
        </h4>
        <p className="text-xs sm:pe-4 sm:font-semibold">{description}</p>
      </div>
    </div>
  );
}

function GameGuidelineHelpCard({ title, body }: GameGuidelineHelpCardProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium sm:text-lg sm:font-bold">{title}</h3>
      <p className="text-xs font-normal sm:text-sm sm:font-medium">{body}</p>
    </div>
  );
}

function GameGuideline() {
  return (
    <div className="flex flex-col gap-5 self-center overflow-hidden pb-2 2xl:w-[520px]">
      <div className="relative flex-1">
        <img
          draggable={false}
          src="/landing/images/guide-paper.webp"
          className="absolute h-full w-full select-none"
          alt="paper background"
        />
        <div className="relative space-y-5 px-5 py-5 pb-8 text-brown sm:px-12">
          {content.help_content.map((content) => (
            <GameGuidelineHelpCard {...content} key={content.title} />
          ))}
          <div className="!mt-12 flex flex-col gap-4 md:flex-row 2xl:flex-col">
            {content.ticket_guide.map((data) => (
              <GameGuidelineTickedHelp {...data} key={data.title} />
            ))}
          </div>
          <div className="flex w-full">
            <button
              id="play"
              className="mx-5 h-12 flex-1 select-none rounded-full bg-[#ff9100] font-bold text-gray-50 [box-shadow:0_4px_0_0_#99502F]"
            >
              شروع
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const QuestionChallenge = async () => {
  const query = new QueryClient();
  await Promise.all([
    query.prefetchQuery({
      queryKey: ["qsLen"],
      queryFn: getQuestionsLength,
    }),
    query.prefetchQuery({
      queryKey: ["qsUnlock"],
      queryFn: getUnlockedQuestions,
    }),
  ]);
  return (
    <section className="relative -mt-32">
      <FloatingGiftBoxes />
      <HydrationBoundary state={dehydrate(query)}>
        <BookContext>
          <div className="flex flex-wrap justify-between gap-16">
            <GameGuideline />
            <Book />
          </div>
        </BookContext>
      </HydrationBoundary>
    </section>
  );
};

export default QuestionChallenge;
