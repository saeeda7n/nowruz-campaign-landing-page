import React, { PropsWithChildren, useMemo } from "react";
import { ChevronDown, Info, Ticket } from "lucide-react";
import rewards from "@/data/landing/rewards.json";
import { cn } from "@/lib/utils";

type ChipProps = { className?: string } & PropsWithChildren;
type RewardCardProps = {
  id: number;
  title: string;
  body: string;
  required_points: number;
  image: string;
  attached_link: string;
  seen: boolean;
  unlocked: boolean;
};

export function Chip({ children, className }: ChipProps) {
  return (
    <div
      className={cn(
        "border-brown flex h-8 items-center gap-2 rounded-xl border px-4 font-bold",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <img
      src="/icons/check.webp"
      className={cn("absolute -start-5 bottom-5 h-auto w-16", className)}
      alt="Check"
    />
  );
}

function Locked({ className }: { className?: string }) {
  return (
    <img
      src="/icons/lock.webp"
      className={cn("absolute -start-5 bottom-5 h-auto w-16", className)}
      alt="Check"
    />
  );
}

function RewardCard(props: RewardCardProps) {
  return (
    <div
      className={cn("relative flex flex-col items-center gap-2", {
        "-translate-y-6": props.unlocked && !props.seen,
      })}
    >
      <div className="bg-ripe-mango relative flex size-40 flex-col gap-2 rounded-3xl p-2 [box-shadow:0_3px_0_0_var(--light-brown)]">
        <div className="flex h-28 flex-1 items-center justify-center p-4">
          <img
            draggable={false}
            className="h-full w-auto object-cover object-center [filter:drop-shadow(0_0_16px_#fff)]"
            src={props.image}
            alt={props.title}
          />
        </div>
        <button className="text-sm font-medium">مشاهده بیشتر</button>
        {props.unlocked ? (
          <>
            <Check />
            {props.seen && <Check className="-start-10" />}
          </>
        ) : (
          <Locked className="-start-4 w-8" />
        )}
      </div>
      <ChevronDown
        strokeWidth={5}
        size={24}
        strokeLinecap={"round"}
        className="stroke-gold [filter:drop-shadow(0_0px_2px_var(--gold))]"
      />
      <div
        className={cn(
          "bg-ripe-mango absolute -bottom-9 z-10 size-5 rounded-full",
          {
            "bg-white [box-shadow:0_0_15px_5px_#fff]": props.unlocked,
            "-bottom-[3.92rem]": props.unlocked && !props.seen,
          },
        )}
      ></div>
    </div>
  );
}

const PointBar = () => {
  const sortedRewards = useMemo(
    () =>
      rewards.sort((a, b) => (a.required_points > b.required_points ? 1 : -1)),
    [rewards],
  );
  return (
    <section className="text-brown flex flex-col gap-12 py-16">
      <div className="flex flex-wrap items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">مجموع کارت های تشویق</h3>
          <p className="flex items-center gap-1 text-xs">
            <Info size={16} />
            با تلاش بیشتر و کسب کارت (صد آفرین و هزار آفرین) شانس برنده شدن خود
            را افزایش دهید
          </p>
        </div>
        <div className="flex gap-4">
          <Chip>
            <Ticket size={16} className="fill-brown" />
            <span className="text-xs">0 کارت صد آفرین</span>
          </Chip>

          <Chip className="border-gold text-gold">
            <Ticket size={16} className="fill-gold" />
            <span className="text-xs">0 کارت هزار آفرین</span>
          </Chip>
        </div>
      </div>

      <div className="relative flex flex-col gap-2">
        <div className="flex justify-around gap-5">
          {sortedRewards.map((data) => (
            <RewardCard
              {...data}
              seen={Math.random() > 0.5}
              unlocked={Math.random() > 0.5}
              key={String(data.id)}
            />
          ))}
        </div>
        <div className="bg-light-brown flex h-9 w-full rounded-full p-1 [box-shadow:0_3px_0_0_#8A3D14]">
          <div className="relative h-full w-1/3 rounded-full bg-gradient-to-l from-[#FFBC00] to-[#FF9100]">
            <div className="absolute -bottom-20 end-0 flex h-9 -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-[#FEC421] px-4 text-xl font-bold">
              <ChevronDown
                strokeWidth={6}
                size={36}
                className="absolute -top-[1.1rem] rotate-180 text-[#FEC421]"
              />
              <span className="mt-1">56</span>
              <Ticket className="fill-brown" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PointBar;
