"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { Chip } from "@/app/(landing)/pointbar/pointBar";
import { Copy, Info, Ticket } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useWheel } from "@/lib/useWheel";

const points = [20, 40, 60, 200, 500, 40, 60, , 200, 20, 20];

function CopyReferralCodeButton({ code }: { code?: string }) {
  if (!code) return "";
  return (
    <div className="flex gap-2">
      <button
        onClick={() => copy(code)}
        className="ms-auto flex h-10 items-center gap-2  rounded-full bg-white/30 px-5 font-medium"
      >
        <Copy size={16} />
        <span>{code}</span>
      </button>

      <button
        onClick={() => copy(`https://ctelecom.com/nowroz?ref=${code}`)}
        className="flex h-10 items-center gap-2 rounded-full  bg-white/30 px-5 text-sm font-medium"
      >
        <Copy size={16} />
        <span>کپی کردن لینک</span>
      </button>
    </div>
  );

  function copy(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("لینک زیر مجموعه گیری با موفقیت کپی شد"))
      .catch(() => toast.error("خطایی در کپی کردن لینک وجود دارد!"));
  }
}

function WheelOfLuckGame() {
  return (
    <div className="relative flex flex-1 items-center justify-center md:min-w-[42rem]">
      <Image
        src="/landing/images/right-gifts.webp"
        alt="Gift box"
        height={198}
        width={320}
        className="absolute -bottom-10 z-20 me-[36rem]"
      />
      <Image
        src="/landing/images/left-gifts.webp"
        alt="Gift box"
        height={196}
        width={340}
        className="absolute -bottom-10 z-20 ms-[42rem]"
      />
      <div className="relative bottom-0 flex h-[28rem] w-full items-center justify-center">
        <Image
          src="/landing/images/wheel-of-luck.webp"
          alt="Wheel of luck"
          height={450}
          width={400}
          draggable={false}
          className="absolute z-10 h-full"
        />
        <Wheel />
        <div className="absolute -bottom-8 z-50">
          <button className="me-auto mt-8 flex h-14 items-center gap-2 rounded-full bg-red-500 px-16 font-bold text-gray-50 [box-shadow:0_4px_0_0_#821F14]">
            بزن بریم
          </button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const invited = 0;
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-5">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">بازی گردونه شانس</h3>
      </div>
      <div className="ms-auto flex flex-wrap justify-end gap-4 gap-y-2">
        <Chip className="text-brown border-gold">
          <span className="text-xs">
            {invited > 0
              ? "افراد دعوت شده توسط شما 4 نفر"
              : "شما تا کنون کسی را دعوت نکرده اید :("}
          </span>
        </Chip>

        <Chip className="text-brown bg-gold border-none">
          <span className="text-xs">امتیاز شما 100 سی تی</span>
        </Chip>
      </div>
    </div>
  );
}

function GameGuideline() {
  const invited = 0;

  return (
    <div className="z-40 flex-1 space-y-8 md:min-w-[34rem]">
      <Header />
      <div className="space-y-4">
        <h5 className="text-base font-semibold">
          چگونه در گردونه شانس شرکت کنم؟
        </h5>
        <p className="text-base">
          با شرکت در مسابقه شما 10 امتیاز بدست می آورید. اما برای کسب امتیاز های
          بیشتر باید پاسخ درست بدهید. با جواب دادن به هر سوال به صورت درست شما
          می توانید 10 امتیاز کسب کنید. یعنی در این 13 روز همه سوالات را به صورت
          درست جواب بدهید 400 امتیاز می گیرید. هر 100 امتیاز یک بار شما می
          توانید در گردونه شانس شرکت کنید
          <br />
          برای مثال: شما اگر 320 امتیاز کسب کنید می توانید 3 بار گردونه شانس را
          بچرخانید و از هدایای بدست آمده یکی از بهترین ها را برای خودتان انتخاب
          کنید
        </p>
      </div>

      <div className="flex flex-col  gap-3 rounded-2xl border-2 border-[#FEC421] bg-[#F9DBAD] px-6 py-5">
        <div className="space-y-2">
          <h5 className="text-sm font-semibold">
            برای بدست آوردن امتیازات بیشتر شما می توانید دوستان خود را با
            استفاده از کد روبه رو دعوت کنید
          </h5>
          <p className="flex  items-center gap-2 text-xs">
            <Info />
            با هر دعوت از دوستان خود 20 امتیاز دریافت می کنید
          </p>
        </div>
        <CopyReferralCodeButton code="CX334SW" />
      </div>
    </div>
  );
}

const WheelOfLuck = () => {
  return (
    <section className="text-brown flex flex-wrap items-center gap-10 overflow-hidden py-24">
      <GameGuideline />
      <WheelOfLuckGame />
    </section>
  );
};

export default WheelOfLuck;

function Wheel() {
  const p = useMemo(
    () => points.sort(() => (Math.random() > 0.5 ? 1 : -1)),
    [],
  ) as number[];
  const wheelRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    useWheel(p, wheelRef);
  }, []);
  return (
    <div className="wheel relative mb-14 rotate-0 overflow-hidden duration-1000 hover:rotate-[360deg]">
      <canvas
        ref={wheelRef}
        height={288}
        width={288}
        className={" rotate-0 transition duration-1000 group-hover:rotate-180"}
      />
    </div>
  );
}
