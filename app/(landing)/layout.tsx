import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative mx-auto max-w-[1940px] overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout;
