"use client";
import React, { useEffect, useState } from "react";
import { TimerIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays, differenceInSeconds, endOfDay, startOfDay } from "date-fns";
import { END, START } from "@/lib/consts";

type TimerPartProps = {
  time: number;
  name: string;
} & React.HTMLAttributes<HTMLDivElement>;

function TimerPart({ time, name, className }: TimerPartProps) {
  if (time > 60) throw new Error("Time cannot be more than 59 passed " + time);
  const strTime = time < 10 ? `0${Math.floor(time)}` : String(Math.floor(time));
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
  const [time, setTime] = useState(0);
  const started = Date.now() > new Date(START).getTime();

  useEffect(() => {
    if (!started) setTime(differenceInSeconds(START, Date.now()));
    else setTime(differenceInSeconds(END, Date.now()));
    const interval = setInterval(() => {
      setTime((t) => --t);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const seconds = time % 60;
  const minutes = (time / 60) % 60;
  const hours = (time / 60 / 60) % 24;
  const days = (time / 60 / 60 / 24) % 59;
  return (
    <div className="mx-auto mt-8 flex min-h-[32rem] max-w-[1180px] flex-col gap-10 rounded-b-3xl bg-[#020836] py-16 sm:min-h-[38rem] sm:gap-10 md:min-h-[40rem] md:gap-y-12">
      <div className="flex items-center justify-center gap-2 px-5 text-[4vw] text-gray-50 sm:text-2xl md:text-3xl">
        <TimerIcon size={36} />
        <h2>زمان {started ? "پایان" : "شروع"} مسابقه پیک نوروزی سی تلکام</h2>
      </div>
      <div className="mx-auto flex select-none gap-2 text-3xl text-gray-50 sm:text-5xl md:text-6xl">
        <TimerPart name="ثانیه" time={seconds} className="hidden sm:flex" />
        <TimeDivider className="hidden sm:flex" />
        <TimerPart name="دقیقه" time={minutes} />
        <TimeDivider />
        <TimerPart name="ساعت" time={hours} />
        <TimeDivider />
        <TimerPart name="روز" time={days} />
      </div>
    </div>
  );
};

export default Timer;
