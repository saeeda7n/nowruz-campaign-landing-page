"use client";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

type Props = React.HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    back?: boolean;
    index: number;
    front?: React.ReactNode;
    rear?: React.ReactNode;
  };
const Paper = ({ front, rear, back, index, ...props }: Props) => {
  const scope = useRef<any>(null);
  const [tl, setTl] = useState<gsap.core.Timeline>();
  useGSAP(
    () => {
      const tl = gsap
        .timeline({ defaults: { duration: 0 }, paused: true })
        .fromTo(
          ".paper",
          { rotateY: 0, duration: 1.5 },
          { rotateY: 180, duration: 1.5 },
        )
        .fromTo(
          ".front",
          { display: "flex", duration: 0.0001 },
          { display: "none", duration: 0.0001 },
          0.4,
        )
        .fromTo(
          ".back",
          { display: "none", duration: 0.0001 },
          {
            display: "flex",
            duration: 0.0001,
          },
          0.4,
        );
      setTl(tl);
    },
    { scope },
  );

  useEffect(() => {
    if (!back) tl?.play();
    else tl?.reverse();
  }, [back]);

  return (
    <div
      className="relative -me-[1.5%] -mt-[0.4%] flex-1 select-none"
      ref={scope}
      style={{ zIndex: index }}
    >
      <div className="paper absolute inset-0 origin-left">
        <div className="relative ms-[20%] flex w-[81%] max-w-[25.3rem] overflow-hidden md:ms-auto md:flex-row-reverse">
          <Image
            draggable="false"
            className="pointer-events-none z-30"
            src="/images/book-paper-right.png"
            width={434}
            height={620}
            alt="Book paper"
          />
          <div className="front absolute inset-0 z-40 flex overflow-hidden px-[10%] py-[10%]">
            {front}
          </div>
          <div
            className="back absolute inset-0 z-40 hidden overflow-hidden px-[10%] py-[10%]"
            style={{ transform: "rotateY(180deg)" }}
          >
            {rear}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Paper;
