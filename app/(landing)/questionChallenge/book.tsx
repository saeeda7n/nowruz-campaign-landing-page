"use client";
import React, { useState } from "react";
import Image from "next/image";
import Paper from "@/app/(landing)/questionChallenge/paper";

const Book = () => {
  const [test, setTest] = useState(false);
  return (
    <div
      className="relative -ms-24 flex flex-1 md:ms-0"
      onClick={() => setTest((p) => !p)}
    >
      <div className="mx-auto flex w-[200%] max-w-[992px] items-center justify-start md:justify-center">
        <Image
          src="/landing/images/open-book.png"
          alt="Open book"
          width={1070}
          height={738}
          className="ms-auto  max-w-[992px] [filter:drop-shadow(0_23px_46px_#581C01)] md:w-auto"
        />
        <div className="absolute inset-0 flex">
          <div className="relative flex-1">
            <Paper index={1} back={test}>
              Hello World
            </Paper>
          </div>
          <div className=" flex-1 "></div>
        </div>
      </div>
    </div>
  );
};

export default Book;
