import React from "react";
import Image from "next/image";
import content from "@/data/landing/content.json";
import Book from "@/app/(landing)/questionChallenge/book";
import BookContext from "@/app/(landing)/questionChallenge/bookContext";
import { getQuestionGameData, getUserStatus } from "@/server/actions/questions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import GuidePaper from "@/app/(landing)/questionChallenge/quidePaper";

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
        className="pointer-events-none absolute -bottom-16 -end-6 z-[555] rotate-[16deg] sm:bottom-12"
      />
    </>
  );
}

const QuestionChallenge = async () => {
  const query = new QueryClient();
  await Promise.all([
    query.prefetchQuery({
      queryKey: ["qsData"],
      queryFn: getQuestionGameData,
    }),
    query.prefetchQuery({
      queryKey: ["qsUserData"],
      queryFn: getUserStatus,
    }),
  ]);
  return (
    <section className="relative -mt-32">
      <FloatingGiftBoxes />
      <HydrationBoundary state={dehydrate(query)}>
        <BookContext>
          <div className="flex flex-wrap justify-between gap-16">
            <GuidePaper />
            <Book />
          </div>
        </BookContext>
      </HydrationBoundary>
    </section>
  );
};

export default QuestionChallenge;
