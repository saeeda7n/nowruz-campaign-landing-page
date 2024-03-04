import React from "react";
import { Dot, TimerIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TimerPartProps = {
  time: number;
  name: string;
} & React.HTMLAttributes<HTMLDivElement>;

function TimerPart({ time, name, className }: TimerPartProps) {
  if (time > 59) throw new Error("Time cannot be more than 59");
  const strTime = time > 9 ? String(time) : `0${time}`;
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex gap-3">
        <div className="flex h-14 w-8 items-center justify-center rounded-xl border pt-1 sm:h-20 sm:w-12 md:h-24 md:w-16">
          {strTime[1]}
        </div>
        <div className="flex h-14 w-8 items-center justify-center rounded-xl border pt-1 sm:h-20 sm:w-12 md:h-24 md:w-16">
          {strTime[0]}
        </div>
      </div>
      <div className="mx-auto text-sm sm:text-base md:text-lg md:font-semibold">
        <span>{name}</span>
      </div>
    </div>
  );
}

function TimeDivider({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-2 flex flex-col sm:mt-4 md:mt-5", className)}>:</div>
  );
}

const Timer = () => {
  return (
    <div className="mx-auto mt-8 flex min-h-[32rem] max-w-[1180px] flex-col gap-10 rounded-b-3xl bg-[#020836] py-16 sm:min-h-[38rem] sm:gap-10 md:min-h-[40rem] md:gap-y-12">
      <div className="flex items-center justify-center gap-2 px-5 text-[4vw] text-gray-50 sm:text-2xl md:text-3xl">
        <TimerIcon size={36} />
        <h2>زمان شروع مسابقه پیک نوروزی سی تلکام</h2>
      </div>
      <div className="mx-auto flex gap-2 text-3xl text-gray-50 sm:text-5xl md:text-6xl">
        <TimerPart name="ثانیه" time={55} className="hidden sm:flex" />
        <TimeDivider className="hidden sm:flex" />
        <TimerPart name="دقیقه" time={16} />
        <TimeDivider />
        <TimerPart name="ساعت" time={6} />
        <TimeDivider />
        <TimerPart name="روز" time={13} />
      </div>
    </div>
  );
};

export default Timer;
