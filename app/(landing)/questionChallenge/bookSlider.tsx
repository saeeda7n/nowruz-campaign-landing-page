import React, { useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/navigation";

function SpecialRewardSliderCard() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-5">
      <div className="relative">
        <div className="absolute -bottom-4 -start-4 flex size-12 items-center justify-center rounded-full bg-[#BC541B]">
          <span className="mt-1 text-xl font-semibold text-[--white-gold] [filter:drop-shadow(1px_1px_0_var(--gold))]">
            16%
          </span>
        </div>
        <img src="/images/iphone-13_2.png" className="max-h-32 w-auto" alt="" />
      </div>
      <p className="line-clamp-2 text-sm font-bold">Iphone 13 Pro Max</p>
    </div>
  );
}

export default function BookSlider() {
  const swiper = useRef<SwiperRef>(null);
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  return (
    <div className="ms-[3%] flex max-w-96 flex-1 items-center justify-center">
      <div className="relative -mt-[16%] max-w-[22rem]">
        <Image
          src="/images/pirate-paper.png"
          alt="Pirate paper"
          width={385}
          draggable={false}
          height={420}
          className="w-auto"
        />
        <div className="absolute inset-0 flex">
          <div className="relative flex flex-1 items-center justify-start">
            <div className="relative flex w-full  justify-center overflow-hidden">
              <div className="mb-[16%] flex w-[60%] max-w-72 flex-col gap-y-2 text-brown">
                <div className="space-y-1 text-center">
                  <h4 className="text-xl font-bold">جوایز ویژه برای شما</h4>
                  <p className="text-[0.6rem] font-bold">
                    بعد از 13روز شما قادر به دریافت جوایز خود هستید
                  </p>
                </div>
                <Swiper
                  ref={swiper}
                  slidesPerView={1}
                  className="relative w-full"
                  onSlideChange={setActionButtons}
                  onInit={setActionButtons}
                >
                  <SwiperSlide>
                    <SpecialRewardSliderCard />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SpecialRewardSliderCard />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SpecialRewardSliderCard />
                  </SwiperSlide>

                  <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-between pb-[15%] ">
                    <NextButton onClick={prev} disabled={!canPrev} />
                    <PrevButton onClick={next} disabled={!canNext} />
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function setActionButtons(swiper: any) {
    setCanNext(swiper.activeIndex < swiper.slides.length - 1);
    setCanPrev(swiper.activeIndex > 0);
  }

  function next() {
    swiper.current?.swiper.slideNext();
  }

  function prev() {
    swiper.current?.swiper.slidePrev();
  }
}

function NextButton({
  disabled,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { disabled: boolean }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "pointer-events-auto size-10",
        { "-scale-x-100": disabled },
        props.className,
      )}
    >
      <img
        draggable={false}
        alt="Action icon"
        src={disabled ? "/icons/next.svg" : "/icons/next-enable.svg"}
      />
    </button>
  );
}

function PrevButton({
  disabled,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { disabled: boolean }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "pointer-events-auto size-10",
        { "-scale-x-100": !disabled },
        props.className,
      )}
    >
      <img
        draggable={false}
        alt="Action icon"
        src={disabled ? "/icons/next.svg" : "/icons/next-enable.svg"}
      />
    </button>
  );
}
