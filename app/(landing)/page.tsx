import React from "react";
import Image from "next/image";
import Header from "@/app/(landing)/header";
import Hero from "@/app/(landing)/hero";
import Timer from "@/app/(landing)/timer";
import QuestionChallenge from "@/app/(landing)/questionChallenge/questionChallenge";
import Report from "@/app/(landing)/report";
import Pointbar from "@/app/(landing)/pointbar/pointBar";
import WheelOfLuck from "@/app/(landing)/wheelOfLuck";
import SpecialOffers from "@/app/(landing)/specialOffers";
import Footer from "@/app/(landing)/footer";
import UserRef from "@/app/(landing)/userRef";

function AbsoluteBackground() {
  return (
    <div className="absolute left-0 right-0 top-0 -z-10 flex justify-center overflow-hidden">
      <Image
        draggable={false}
        className="min-w-[1200px] select-none object-center sm:min-w-[1820px]"
        src="/landing/hero/background.webp"
        alt="Absolute backgound"
        height={1490}
        width={1920}
      />
    </div>
  );
}

const Page = async () => {
  return (
    <>
      <Header />
      <main className="container">
        <UserRef />
        <AbsoluteBackground />
        <Hero />
        <Timer />
        <QuestionChallenge />
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
