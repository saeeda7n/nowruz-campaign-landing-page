import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex min-h-[min(100lvh,60rem)] flex-col items-center justify-end pt-24">
      <Image
        draggable={false}
        src="/landing/hero/offering.webp"
        alt="CTelecom special offer"
        width={434}
        height={234}
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
