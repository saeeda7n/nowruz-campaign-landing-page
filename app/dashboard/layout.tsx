import React, { PropsWithChildren } from "react";

function DashboardSidebar() {
  return (
    <div className="w-96 border-e bg-white">
      <div className="sticky top-16">asda</div>
    </div>
  );
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 h-16 bg-blue-500">Header</div>
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
