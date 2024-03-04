import React from "react";
import Image from "next/image";
import Header from "@/app/(landing)/header";
import Hero from "@/app/(landing)/hero";
import Timer from "@/app/(landing)/timer";
import Game from "@/app/(landing)/game";
import Report from "@/app/(landing)/report";
import Pointbar from "@/app/(landing)/pointbar/pointBar";
import WheelOfLuck from "@/app/(landing)/wheelOfLuck";
import SpecialOffers from "@/app/(landing)/specialOffers";
import Footer from "@/app/(landing)/footer";

function AbsoluteBackground() {
  return (
    <div className="absolute left-0 right-0 top-0 -z-10 flex justify-center overflow-hidden">
      <Image
        draggable={false}
        className="min-w-[1820px] select-none object-center"
        src="/landing/hero/background.webp"
        alt="Absolute backgound"
        height={1490}
        width={1920}
      />
    </div>
  );
}

const Page = () => {
  return (
    <>
      <Header />
      <main className="container">
        <AbsoluteBackground />
        <Hero />
        <Game />
        <Pointbar />
        <WheelOfLuck />
        <Report />
        <SpecialOffers />
      </main>
      <Footer />
    </>
  );
};

export default Page;
