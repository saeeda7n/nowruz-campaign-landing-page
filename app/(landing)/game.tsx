import React from "react";
import Image from "next/image";
import { help_content, ticked_guide } from "@/data/landing/content.json";

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
        className="absolute -top-52 end-12 z-10 -scale-x-100"
      />
      <Image
        draggable={false}
        src="/landing/images/gift-box-2.webp"
        alt="Floating gift box"
        height={140}
        width={140}
        className="absolute -top-16 start-1/3 -scale-x-100 2xl:start-[550px] 2xl:top-2 2xl:z-10"
      />
      <Image
        draggable={false}
        src="/landing/images/gift-box-3.webp"
        alt="Floating gift box"
        width={170}
        height={175}
        className="absolute -start-8 -top-32 z-10 "
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
    <div className="flex min-h-[5.5rem] items-center gap-4 rounded-full bg-[#e9a56e]/50 p-2 pe-6">
      <div className="flex size-20 flex-shrink-0 items-center justify-center rounded-full bg-black px-1">
        <Image
          src={image}
          alt={title}
          className="w-full"
          width={60}
          height={48}
        />
      </div>
      <div className="space-y-2">
        <h4 className="text-2xl font-semibold">{title}</h4>
        <p className="text-xs font-semibold">{description}</p>
      </div>
    </div>
  );
}

function GameGuidelineHelpCard({ title, body }: GameGuidelineHelpCardProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm font-medium">{body}</p>
    </div>
  );
}

function GameGuideline() {
  return (
    <div className="flex flex-col gap-5 overflow-hidden pb-2 2xl:w-[520px]">
      <div className="relative flex-1">
        <img
          src="/landing/images/guide-paper.webp"
          className="absolute h-full w-full"
          alt="paper background"
        />
        <div className="text-brown relative space-y-5 px-12 py-5 pb-8">
          {help_content.map((content) => (
            <GameGuidelineHelpCard {...content} key={content.title} />
          ))}
          <div className="!mt-12 space-y-4">
            {ticked_guide.map((data) => (
              <GameGuidelineTickedHelp {...data} key={data.title} />
            ))}
          </div>
        </div>
      </div>
      <button className="mx-5 h-12 rounded-full bg-[#ff9100] font-bold text-gray-50 [box-shadow:0_4px_0_0_#99502F]">
        شروع
      </button>
    </div>
  );
}

function TheGame() {
  return (
    <div className="flex-1">
      <Image
        src="/landing/images/open-book.png"
        alt="Open book"
        width={1070}
        height={738}
        className="ms-auto w-auto [filter:drop-shadow(0_23px_46px_#581C01)]"
      />
    </div>
  );
}

const Game = () => {
  return (
    <section className="relative -mt-32">
      <FloatingGiftBoxes />
      <div className="flex flex-wrap justify-between gap-16">
        <GameGuideline />
        <TheGame />
      </div>
    </section>
  );
};

export default Game;
