import React from "react";
import { Download, FileDown } from "lucide-react";
import Image from "next/image";

const Report = () => {
  return (
    <section className="mx-[calc(50%-50vw)] overflow-hidden bg-red-500 py-5 lg:py-24">
      <div className="container flex flex-col gap-8 gap-y-16 text-gray-50 lg:flex-row">
        <div className="mt-14 flex max-w-xl flex-col justify-center gap-4">
          <h3 className="text-lg font-bold">گزارش سال 1402 سی تلکام</h3>
          <p className="text-base">
            اولین گزارش سال سی تلکام با تمرکز بر داده ها و مهم ترین دستاورد های
            این شرکت در سال 1402 به صورت آنلاین در دسترس است
          </p>
          <a
            href="#"
            className="bg-primary-ct me-auto mt-8 flex h-14 items-center gap-2 rounded-full px-8 font-bold [box-shadow:0_4px_0_0_#111140]"
          >
            <FileDown />
            دانلود و مشاهده
          </a>
        </div>
        <div className="relative mx-auto -mb-32 lg:mx-0 lg:-mb-36 lg:ms-auto">
          <Image
            src="/images/ct-report-book.webp"
            alt="Ct report book"
            height={768}
            width={554}
            className="relative mx-auto max-w-64 rotate-[21deg] md:max-w-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Report;
