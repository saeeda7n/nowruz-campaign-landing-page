import React from "react";
import { Dot, TimerIcon } from "lucide-react";

type TimerPartProps = {
  time: number;
  name: string;
};

function TimerPart({ time, name }: TimerPartProps) {
  if (time > 59) throw new Error("Time cannot be more than 59");
  const strTime = time > 9 ? String(time) : `0${time}`;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <div className="flex h-24 w-16 items-center justify-center rounded-xl border pt-1">
          {strTime[1]}
        </div>
        <div className="flex h-24 w-16 items-center justify-center rounded-xl border pt-1">
          {strTime[0]}
        </div>
      </div>
      <div className="mx-auto text-lg font-semibold">
        <span>{name}</span>
      </div>
    </div>
  );
}

function TimeDivider() {
  return <div className="mt-5 flex flex-col">:</div>;
}

const Timer = () => {
  return (
    <div className="mx-auto mt-8 flex min-h-[40rem] max-w-[1180px] flex-col gap-12 rounded-b-3xl bg-[#020836] py-16">
      <div className="flex items-center justify-center gap-2 text-3xl text-gray-50">
        <TimerIcon size={36} />
        <h2>زمان شروع مسابقه پیک نوروزی سی تلکام</h2>
      </div>
      <div className="mx-auto flex gap-2 text-6xl text-gray-50">
        <TimerPart name="ثانیه" time={55} />
        <TimeDivider />
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
