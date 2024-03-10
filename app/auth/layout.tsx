import React, { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-lvh justify-center">
      <div className="flex max-w-[31rem] flex-1 flex-col items-center gap-8 px-2 py-16 pb-8 sm:px-8">
        {children}
        <div className="mt-auto w-full max-w-96 text-xs">سی تلکام</div>
      </div>
      <div className="hidden flex-1 bg-gray-100 lg:block">
        <img
          draggable={false}
          alt="Auth page banner"
          className="sticky top-0 h-full max-h-lvh w-full object-cover object-center"
          src="https://cdn.dribbble.com/userupload/4240282/file/original-afd59f15f2118b634107b4c5696813ae.png"
        />
      </div>
    </div>
  );
};

export default Layout;
