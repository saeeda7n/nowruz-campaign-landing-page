"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Chip } from "@/app/(landing)/pointbar/pointBar";
import { Copy, Info, Ticket } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useWheel } from "@/lib/useWheel";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@/authProvider";
import Link from "next/link";
import { POINTS } from "@/lib/consts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { invitedUsers, rollWheel } from "@/server/actions/wheelOfLuck";

const points = [20, 40, 60, 200, 500, 40, 60, 100];

function CopyReferralCodeButton({ code }: { code?: string }) {
  if (!code) return "";
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
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
      .then(() =>
        toast.success(
          "لینک زیر مجموعه گیری با موفقیت کپی شد, کافیه اون رو با دوستات به اشتراک بزاری!",
        ),
      )
      .catch(() => toast.error("خطایی در کپی کردن لینک وجود دارد!"));
  }
}

function Header() {
  const { user } = useAuth();
  const invited = useQuery({
    queryFn: () => invitedUsers(),
    queryKey: ["invited"],
  });
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-5">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">بازی گردونه شانس</h3>
      </div>
      {user && (
        <div className="ms-auto hidden flex-wrap justify-end gap-4 gap-y-2 sm:flex">
          <Chip className="border-gold text-brown">
            <span className="text-xs">
              {(invited?.data || 0) > 0
                ? `افراد دعوت شده توسط شما ${invited.data} نفر`
                : "شما تا کنون کسی را دعوت نکرده اید :("}
            </span>
          </Chip>

          <Chip className="border-none bg-gold text-brown">
            <span className="text-xs">
              امتیاز شما {user?.points.toLocaleString()} سی تی
            </span>
          </Chip>
        </div>
      )}
    </div>
  );
}

function GameGuideline() {
  const { user } = useAuth();
  const invited = 0;

  return (
    <div className="z-40 min-w-72 flex-1 space-y-8 sm:min-w-[34rem]">
      <Header />
      <div className="space-y-4">
        <h5 className="text-sm font-semibold sm:text-base">
          چگونه در گردونه شانس شرکت کنم؟
        </h5>
        <p className="text-sm sm:text-base">
          با شرکت در مسابقه شما 10 امتیاز بدست می آورید. اما برای کسب امتیاز های
          بیشتر باید پاسخ درست بدهید. با جواب دادن به هر سوال به صورت درست شما
          می توانید 10 امتیاز کسب کنید. یعنی در این 13 روز همه سوالات را به صورت
          درست جواب بدهید 400 امتیاز می گیرید. هر 100 امتیاز یک بار شما می
          توانید در گردونه شانس شرکت کنید.
          <br />
          برای مثال: شما اگر 320 امتیاز کسب کنید می توانید 3 بار گردونه شانس را
          بچرخانید و از هدایای بدست آمده یکی از بهترین ها را برای خودتان انتخاب
          کنید.
        </p>

        {!user && (
          <div className="!mt-2 text-sm sm:text-base">
            برای شروع کافیه یک حساب کاربری جدید بسازی یا وارد حسابت بشی! برای
            ساخت حساب کاربری یا ورود به حسابت میتونی{" "}
            <Link href="/auth" className="underline">
              اینجا کلیک کنی.
            </Link>
          </div>
        )}
      </div>

      {user && (
        <div className="flex flex-col gap-3 rounded-2xl border-2 border-[#FEC421] bg-[#F9DBAD] px-6 py-5">
          <div className="space-y-2">
            <h5 className="text-xs font-semibold sm:text-sm">
              برای کسب امتیاز بیشتر کافیست لینک زیر مجموعه گیری را با دوستان خود
              به اشتراک بگذارید!
            </h5>
            <p className="flex items-center gap-2 text-xs">
              <Info className="hidden sm:block" />
              با دعوت از هر یک از دوستان خود میتوانید 20 امتیاز کسب کنید, همچنین
              دوست شما نیز 20 امتیاز دریافت خواهد کرد.
            </p>
          </div>
          <CopyReferralCodeButton code={user?.refId} />
        </div>
      )}
    </div>
  );
}

function GiftBoxes() {
  return (
    <>
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
    </>
  );
}

function WheelOfLuckGame() {
  const user = useUser();
  const roll = useMutation({
    mutationFn: () => rollWheel(),
  });
  const [disabled, setDisabled] = useState(false);

  function Turn() {
    roll.mutate(undefined, {
      onError() {
        toast.error("خطایی رخ داده است! لطفا مجددا تلاش کنید");
      },
      onSuccess(data: any) {
        if (data.id) {
          setDisabled(true);
          setTimeout(() => setDisabled(false), 10_000);
        } else if (data.status === false) {
          toast.message(data.message);
        }
      },
    });
  }

  return (
    <div className="relative flex flex-1 items-center justify-center sm:min-w-[28rem]">
      <GiftBoxes />
      <div className="relative bottom-0 flex h-[28rem] w-full items-center justify-center">
        <Image
          src="/landing/images/wheel-of-luck.webp"
          alt="Wheel of luck"
          height={450}
          width={400}
          draggable={false}
          className="absolute z-10 h-auto w-full max-w-96 sm:h-full sm:w-auto sm:max-w-none"
        />
        <Wheel roll={roll.data} />
        <div className="absolute -bottom-8 z-50">
          {user ? (
            user.points >= 100 ? (
              <button
                disabled={disabled || roll.isPending}
                onClick={Turn}
                className="me-auto mt-8 flex h-14 items-center gap-2 rounded-full bg-red-500 px-16 font-bold text-gray-50 [box-shadow:0_4px_0_0_#821F14] disabled:bg-red-400"
              >
                بزن بریم
              </button>
            ) : (
              <button
                disabled={disabled || roll.isPending}
                onClick={Turn}
                className="me-auto mt-8 flex h-14 items-center gap-2 rounded-full bg-red-500 px-16 font-bold text-gray-50 [box-shadow:0_4px_0_0_#821F14] disabled:bg-red-400"
              >
                افزایش امتیاز
              </button>
            )
          ) : (
            <Link
              href="/auth"
              className="me-auto mt-8 flex h-14 items-center gap-2 rounded-full bg-red-500 px-16 font-bold text-gray-50 [box-shadow:0_4px_0_0_#821F14] disabled:bg-red-400"
            >
              وارد شوید
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function Wheel({
  className,
  roll,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  roll?: any;
}) {
  const p = useMemo(
    () => POINTS.sort(() => (Math.random() > 0.5 ? 1 : -1)),
    [],
  ) as number[];
  const size = 360 / p.length;
  const [rotate, setRotate] = useState(size / 2);
  const wheelRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    useWheel(p, wheelRef);
  }, []);

  useEffect(() => {
    if (!roll && !roll?.value && rotate) {
      setRotate(size / 2);
      return;
    }

    const index = p.indexOf(roll?.value || 0);
    setRotate((p) => index * -size - size / 2 + 360 * 10);
  }, [roll]);
  return (
    <div
      {...props}
      style={
        {
          "--rotate": `${rotate}deg`,
          transitionDuration: `${roll ? "10s" : "0s"}`,
        } as React.CSSProperties
      }
      className={cn(
        "wheel relative mb-14 aspect-square max-w-72 rotate-[var(--rotate)] overflow-hidden transition-transform ease-out",
        className,
      )}
    >
      <canvas
        ref={wheelRef}
        height={480}
        width={480}
        className={"h-full w-full transition duration-1000"}
      />
    </div>
  );
}

const WheelOfLuck = () => {
  return (
    <section
      id="wheel"
      className="flex flex-col items-center gap-10 gap-y-16 py-24 text-brown lg:flex-row"
    >
      <GameGuideline />
      <WheelOfLuckGame />
    </section>
  );
};

export default WheelOfLuck;
