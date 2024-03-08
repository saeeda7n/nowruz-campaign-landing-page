import React, { PropsWithChildren, Suspense, useMemo } from "react";
import { ChevronDown, Info, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

import Image from "next/image";
import PointBarSlider from "@/app/(landing)/pointbar/pointBarSlider";
import { getSession } from "@/server/actions/auth";

type ChipProps = { className?: string } & PropsWithChildren;

export function Chip({ children, className }: ChipProps) {
  return (
    <div
      className={cn(
        "flex h-8 select-none items-center gap-2 rounded-xl border border-brown px-4 font-bold",
        className,
      )}
    >
      {children}
    </div>
  );
}

async function Header() {
  const { user } = await getSession();
  const hundred = user?.cards.filter((card) => card === "100").length;
  const thousand = user?.cards.filter((card) => card === "1000").length;
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-5">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">مجموع کارت های تشویق</h3>
        <p className="flex items-center gap-1 text-xs">
          <Info size={16} />
          با تلاش بیشتر و کسب کارت (صد آفرین و هزار آفرین) شانس برنده شدن خود را
          افزایش دهید
        </p>
      </div>
      {user && (
        <div className="ms-auto flex flex-wrap justify-end gap-4 gap-y-2">
          <Chip>
            <Ticket size={16} className="fill-brown" />
            <span className="text-xs">{hundred} کارت صد آفرین</span>
          </Chip>

          <Chip className="border-gold text-gold">
            <Ticket size={16} className="fill-gold" />
            <span className="text-xs">{thousand} کارت هزار آفرین</span>
          </Chip>
        </div>
      )}
    </div>
  );
}

const PointBar = () => {
  return (
    <section className="flex flex-col gap-12 overflow-hidden py-16 pt-24 text-brown">
      <Header />
      <div className="min-h-96 pt-12">
        <PointBarSlider />
      </div>
    </section>
  );
};

export default PointBar;
