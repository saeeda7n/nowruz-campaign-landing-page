import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex min-h-96 flex-col items-center justify-end pt-32 sm:min-h-[min(100lvh,60rem)] ">
      <Image
        draggable={false}
        src="/landing/hero/offering.webp"
        alt="CTelecom special offer"
        width={434}
        height={234}
        className="w-[70vw] md:w-96 lg:w-auto"
      />

      <Image
        draggable={false}
        src="/landing/hero/haft-sin.webp"
        alt="haft-sin"
        width={1180}
        height={860}
        className="-mb-16 mt-12"
      />
    </section>
  );
};

export default Hero;
