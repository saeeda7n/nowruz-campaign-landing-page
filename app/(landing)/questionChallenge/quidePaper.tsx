import Image from "next/image";
import content from "@/data/landing/content.json";
import React from "react";
import StartGameButton from "@/app/(landing)/questionChallenge/startGameButton";

type GameGuidelineTicketHelpProps = {
  title: string;
  description: string;
  image: string;
};
type GameGuidelineHelpCardProps = {
  title: string;
  body: string;
};

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

export default function GuidePaper() {
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
            <StartGameButton />
          </div>
        </div>
      </div>
    </div>
  );
}
