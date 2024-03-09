"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronDown, Ticket } from "lucide-react";
import rewards from "@/data/landing/rewards.json";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "postcss";
import { useUser } from "@/authProvider";
import { useMutation } from "@tanstack/react-query";
import { seenCard } from "@/server/actions/pointBar";

type RewardCardProps = {
  id: string;
  title: string;
  body: string;
  required_points: number;
  image: string;
  attached_link: string;
  seen: boolean;
  unlocked: boolean;
};

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
    <Image
      width={48}
      height={64}
      src="/icons/lock.webp"
      className={cn("absolute -start-5 bottom-5 h-auto w-16", className)}
      alt="Check"
    />
  );
}

function RewardCard(props: RewardCardProps) {
  const seen = useMutation({
    mutationFn: () => seenCard(props.id),
  });
  return (
    <div
      className={cn(
        "group relative flex select-none flex-col items-center gap-2 transition duration-300",
        {
          "-translate-y-6": props.unlocked && !props.seen,
          locked: !props.unlocked,
        },
      )}
    >
      <div
        className={cn(
          "reward-card relative flex size-40 flex-col gap-2 rounded-3xl bg-ripe-mango p-2 ring-8 ring-gold group-[.locked]:pointer-events-none group-[.locked]:opacity-50",
          { "reward-card-second-shadow": props.unlocked && !props.seen },
        )}
      >
        <div className="flex h-28 flex-1 items-center justify-center p-4">
          <img
            draggable={false}
            className="h-full w-auto object-cover object-center [filter:drop-shadow(0_0_16px_#fff)]"
            src={props.image}
            alt={props.title}
          />
        </div>
        <button
          className="text-sm font-medium"
          onClick={() => {
            seen.mutate();
          }}
        >
          مشاهده بیشتر
        </button>
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
          "absolute -bottom-9 z-10 size-5 rounded-full bg-ripe-mango",
          {
            "bg-white [box-shadow:0_0_15px_5px_#fff]": props.unlocked,
            "-bottom-[3.8rem]": props.unlocked && !props.seen,
          },
        )}
      ></div>
      <div
        className={cn("absolute -bottom-[5.5rem] z-10 text-lg font-bold", {
          "-bottom-[7.2rem]": props.unlocked && !props.seen,
        })}
      >
        {props.required_points.toLocaleString()}
      </div>
    </div>
  );
}

const PointBarSlider = () => {
  const user = useUser();
  const point = user?.vouchers || 0;
  const [progress, setProgress] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const sortedRewards = useMemo(
    () =>
      rewards.sort((a, b) => (a.required_points > b.required_points ? 1 : -1)),
    [],
  );
  const index = useMemo(
    () =>
      sortedRewards.findIndex(({ required_points }) => required_points > point),
    [point, sortedRewards],
  );

  useEffect(() => {
    if (!wrapper.current) return;
    const current = sortedRewards[index - 1]?.required_points || 0;
    const next = sortedRewards[index]?.required_points || current;
    const { width } = wrapper.current.getBoundingClientRect();
    const boxSize = width / sortedRewards.length;
    const stepProgress =
      (((point - current) / (next - current)) * boxSize) / width;
    const progress = (index * boxSize - boxSize / 2) / width;
    if (isNaN(stepProgress) || Number.POSITIVE_INFINITY === stepProgress)
      setProgress(1);
    else setProgress(progress + stepProgress);
  }, [index, wrapper.current, point]);

  useEffect(() => {
    swiper?.setProgress(progress);
  }, [progress]);
  return (
    <>
      <Swiper
        onInit={(s) => setSwiper(s)}
        slidesPerView="auto"
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper select-none !overflow-visible"
      >
        <SwiperSlide className="!w-[1560px]">
          <div className="relative flex flex-col gap-2">
            <div className="flex justify-around" ref={wrapper}>
              {sortedRewards.map((data) => (
                <RewardCard
                  {...data}
                  seen={user?.seenCards.includes(data.id) || false}
                  unlocked={data.required_points <= point}
                  key={data.id}
                />
              ))}
            </div>
            <div className="flex h-9 w-full rounded-full bg-light-brown p-1 [box-shadow:0_3px_0_0_#8A3D14]">
              <div
                className="h-full min-w-[3%] max-w-[97%] rounded-full bg-gradient-to-l from-[#FFBC00] to-[#FF9100] transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              >
                <div className="relative h-full w-full">
                  <div className="absolute -bottom-20 end-0 z-50 flex h-9 -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-ripe-mango px-4 text-xl font-bold">
                    <ChevronDown
                      strokeWidth={6}
                      size={36}
                      className="absolute -top-[1.1rem] rotate-180 text-[#FEC421]"
                    />
                    <span className="mt-1 select-none">
                      {point.toLocaleString()}
                    </span>
                    <Ticket className="fill-brown" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default PointBarSlider;
